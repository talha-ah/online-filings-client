import jsPDF from "jspdf"
import "jspdf-autotable"

import DateUtility from "@utils/date"
import { calculateDiscount, pad, numberWithCommas } from "@utils/common"

export const generateReceipt = ({ data, type = "order", settings }) => {
  const pdfHeaders = [
    {
      header: "Sr",
      dataKey: "sr",
    },
    {
      header: "Item",
      dataKey: "title",
    },
    {
      header: "Qty",
      dataKey: "quantity",
    },
    {
      header: "Rate",
      dataKey: "price",
    },
    {
      header: "Disc %",
      dataKey: "discount",
    },
    {
      header: "Disc",
      dataKey: "discountedPrice",
    },
    {
      header: "Amount",
      dataKey: "totalPrice",
    },
  ]

  let totalQty = 0
  let totalPrice = 0
  let totalDiscount = 0

  let pdfData = data.items.map((item, index) => {
    let quantity = item.quantity
    let discount = item.discount.value || 0
    let discountedPrice = item.discount.value
      ? calculateDiscount(item.salePrice, item.quantity, item.discount.value)
          .discount
      : 0
    let total = calculateDiscount(
      item.salePrice,
      item.quantity,
      item.discount.value
    ).value

    totalPrice += Number(total)
    totalQty += Number(quantity)
    totalDiscount += Number(discountedPrice)

    return {
      id: String(index + 1),
      sr: String(index + 1),
      title: item.itemId.title,
      quantity: String(quantity),
      price: String(numberWithCommas(item.salePrice)),
      discount: String(numberWithCommas(discount)),
      discountedPrice: String(numberWithCommas(discountedPrice)),
      totalPrice: String(numberWithCommas(total)),
    }
  })

  pdfData[pdfData.length] = {
    title: "Total",
    quantity: numberWithCommas(totalQty),
    totalPrice: numberWithCommas(totalPrice),
    discountedPrice: numberWithCommas(totalDiscount),
  }

  var doc = new jsPDF({ unit: "mm", format: "a4", orientation: "p" })
  doc.setFontSize(26, "bold")
  doc.text(settings?.name || "", 105, 20, null, null, "center")
  doc.setFontSize(12)
  doc.text(
    `Address: ${settings?.address?.addressOne || '' }`,
    105,
    28,
    null,
    null,
    "center"
  )
  doc.text(`Mobile #: ${settings?.phone||""}`, 105, 35, null, null, "center")
  doc.text(
    `${type === "quotation" ? "Quotation" : "Receipt"} #: ${pad(data.sr)}`,
    14,
    44
  )
  doc.text(
    `Date: ${DateUtility.formatDate(data.createdAt)}`,
    196,
    44,
    null,
    null,
    "right"
  )
  doc.text("Customer: " + data?.customerName, 14, 52)

  doc.autoTable({
    startX: 0,
    startY: 56,
    body: pdfData,
    theme: "grid",
    columns: pdfHeaders,
    columnStyles: { text: { cellWidth: "auto" } },
    styles: { overflow: "ellipsize", cellWidth: "wrap" },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: 0,
      fontStyle: "bold",
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
    },
    bodyStyles: {
      fillColor: [255, 255, 255],
      textColor: 0,
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
    },
  })

  doc.text("Signature ___________________", 14, doc.lastAutoTable.finalY + 14)

  doc.autoPrint()
  window.open(doc.output("bloburl"))
  // doc.save(`${data.order_id}.pdf`)
  return
}
