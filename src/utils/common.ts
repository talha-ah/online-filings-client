export const isNotEmpty = (item: any) =>
  item !== undefined && item !== null && item !== "" && item.length !== 0

export const truncateString = (text: any, ellipsisString: string) =>
  (text || "").length > ellipsisString
    ? text.substring(0, ellipsisString) + "..."
    : text

export const truncate = (n: any, digits: any) => {
  if (!n) return 0

  var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
    m = n.toString().match(re)
  return m ? parseFloat(m[1]) : n.valueOf()
}

export const numberWithCommas = (x: any) => {
  if (!x) return 0
  return Number(String(x).replaceAll(",", "")).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })
}

export const objectToParams = (obj: any) => {
  let str = ""
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      if (str != "") {
        str += "&"
      }
      str += key + "=" + encodeURIComponent(obj[key])
    }
  }
  return str
}

export const base64ToBlob = (base64: string) => {
  var byteString = atob(base64.split(",")[1])
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: "image/png" })
}

export const removeDuplicateRow = (array: any, key: string) => [
  ...array
    .reduce((map: any, obj: any) => map.set(obj[key], obj), new Map())
    .values(),
]

export const toTitleCase = (phrase: string) => {
  if (!phrase) return ""

  return phrase
    .toLowerCase()
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export const timeoutPromise = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const roundNumber = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100

export const downloadFile = (url: string, fileName: string) => {
  // for non-IE
  const req = new XMLHttpRequest()
  req.open("GET", url, true)
  req.responseType = "blob"
  req.onload = function () {
    //Convert the Byte Data to BLOB object.
    const blob = new Blob([req.response], { type: "application/octetstream" })

    //Check the Browser type and download the File.
    const isIE = false || !!document.DOCUMENT_NODE
    if (isIE) {
      // window.navigator.msSaveBlob(blob, fileName)
    } else {
      const url = window.URL || window.webkitURL
      const link = url.createObjectURL(blob)
      const a = document.createElement("a")
      a.setAttribute("download", fileName)
      a.setAttribute("href", link)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }
  req.send()
}

export const generateId = (prefix = "", length = 7) => {
  let result = prefix
  for (let i = 0; i < length; i++) {
    const random = Math.random()
    result += String.fromCharCode(
      Math.floor(random * 26) + (random < 0.5 ? 65 : 97)
    )
  }
  return result.toUpperCase()
}

export const calcDiscount = (value: number, discount: number) => {
  value = value
  discount = discount
  if (!discount || discount === 0) return discount
  return (value * discount) / 100
}

export const calculateDiscount = (
  value: number,
  qty: number,
  discount: number
) => {
  value = value * qty
  discount = calcDiscount(value, discount)
  return {
    discount: discount,
    value: value - discount,
  }
}

// Pad a number with leading zeros
export const pad = (num: number | string, size = 6) => {
  let s = num + ""
  while (s.length < size) s = "0" + s
  return s
}

export const calculateTableTotal = (rows: any, field: string) => {
  const total = rows.reduce((acc: number, row: any) => acc + row[field], 0)
  return numberWithCommas(total)
}
