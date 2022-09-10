import Head from "next/head"
import type { NextPage } from "next"
import React, { useState, useEffect } from "react"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import Box from "@mui/material/Box"
import { Theme } from "@mui/material/styles"
import AddIcon from "@mui/icons-material/Add"
import { styled } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import InputBase from "@mui/material/InputBase"
import Typography from "@mui/material/Typography"
import MuiAccordion from "@mui/material/Accordion"
import SearchIcon from "@mui/icons-material/Search"
import InputAdornment from "@mui/material/InputAdornment"
import CircularProgress from "@mui/material/CircularProgress"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined"
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary"

import { useApi } from "@hooks/useApi"
import { CreateTask } from "@forms/tasks"
import { Title } from "@components/Title"
import { APP_NAME } from "@utils/constants"
import { Button } from "@components/Button"
import { Dialog } from "@components/Dialog"
import { ENDPOINTS } from "@utils/constants"
import useDebounce from "@hooks/useDebounce"
import { CreateProject } from "@forms/projects"
import { SIDEBAR_WIDTH } from "@utils/constants"
import { APP_BAR_HEIGHT } from "@utils/constants"
import { IconButton } from "@components/IconButton"

dayjs.extend(relativeTime)

const Home: NextPage = () => {
  const [api] = useApi()

  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<any>([])
  const [project, setProject] = useState<any>(null)

  useEffect(() => {
    fetchProjects()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const temp = [...projects]
    const index = temp.findIndex((t) => String(t._id) === String(project._id))
    temp[index] = project

    setProjects(temp)

    // eslint-disable-next-line
  }, [project])

  const fetchProjects = async (query: string = "") => {
    try {
      setLoading(true)

      const response = await api({
        uri: `${ENDPOINTS.projects}?search=${query}`,
      })

      setProjects(response?.data)
      setProject(response?.data[0])
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={(theme: Theme) => ({
          width: "100vw",
          height: "100vh",
          backgroundColor: theme.palette.background.default,
        })}
      >
        <Header
          project={project}
          onSearch={fetchProjects}
          onCreate={(task) => {
            setProject({
              ...project,
              tasks: [...project.tasks, task],
            })
          }}
        />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            height: `calc(100% - ${APP_BAR_HEIGHT}px)`,
          }}
        >
          <SideBar
            project={project}
            loading={loading}
            projects={projects}
            onSelect={(project: any) => setProject(project)}
            onCreate={(project: any) => {
              let temp = [...projects]
              temp.push(project)
              setProjects(temp)
            }}
          />

          <Content
            project={project}
            onCreate={(task) => {
              setProject({
                ...project,
                tasks: [...project.tasks, task],
              })
            }}
            onComplete={(task) => {
              const temp = [...project.tasks]
              const index = temp.findIndex(
                (t) => String(t._id) === String(task._id)
              )
              temp[index] = task
              setProject({
                ...project,
                tasks: temp,
              })
            }}
          />
        </Box>
      </Box>
    </>
  )
}

const Header = ({
  project,
  onSearch,
  onCreate,
}: {
  project?: any
  onCreate?: (project: any) => void
  onSearch?: (query: string) => void
}) => {
  const [query, setQuery] = useState("")
  const debouncedValue = useDebounce(query)

  useEffect(() => {
    onSearch && onSearch(debouncedValue)
    // eslint-disable-next-line
  }, [debouncedValue])

  return (
    <Box
      sx={(theme: Theme) => ({
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "red",
        padding: theme.spacing(2),
        height: `${APP_BAR_HEIGHT}px`,
        justifyContent: "space-between",
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Box />

      <InputBase
        id="search"
        size="small"
        name="search"
        value={query}
        sx={{ color: "white" }}
        placeholder="Quick find"
        onChange={(event: any) => setQuery(event.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "white" }} />
          </InputAdornment>
        }
      />

      {project ? (
        <Dialog
          title="Add Task"
          trigger={({ toggleOpen }) => (
            <IconButton onClick={toggleOpen}>
              <AddIcon sx={{ color: "white" }} />
            </IconButton>
          )}
          content={({ onClose }) => (
            <CreateTask
              onClose={onClose}
              onSubmit={onCreate}
              project={project}
            />
          )}
        />
      ) : (
        <Box />
      )}
    </Box>
  )
}

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  borderBottom: `1px solid ${theme.palette.divider}`,
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}))

const SideBar = ({
  loading,
  project,
  onCreate,
  projects,
  onSelect,
}: {
  project: any
  projects: any[]
  loading: boolean
  onSelect: (project: any) => void
  onCreate: (project: any) => void
}) => {
  return (
    <Box
      sx={(theme: Theme) => ({
        pt: 2,
        display: "flex",
        width: SIDEBAR_WIDTH,
        flexDirection: "column",
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.grey[100],
      })}
    >
      {loading ? (
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <MuiAccordion
            square
            elevation={0}
            disableGutters
            defaultExpanded={true}
            sx={{ backgroundColor: "transparent" }}
          >
            <AccordionSummary id="projects" aria-controls="projects">
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>Projects</Typography>
                <AddIcon />
              </Box>
            </AccordionSummary>
            <MuiAccordionDetails>
              {projects.map((p: any) => (
                <Box
                  key={p._id}
                  onClick={() => onSelect(p)}
                  sx={{
                    px: 4,
                    py: 1,
                    display: "flex",
                    cursor: "pointer",
                    alignItems: "center",
                    "&:hover": {
                      fontWeight: "bold",
                    },
                  }}
                >
                  <Typography
                    color="gray"
                    variant="subtitle2"
                    sx={{
                      mr: 0.5,
                      fontWeight: p._id === project._id ? "bold" : "inherit",
                    }}
                  >
                    {p.name}
                  </Typography>
                  <Typography variant="caption" color="lightgray">
                    {p.tasks.length}
                  </Typography>
                </Box>
              ))}
            </MuiAccordionDetails>
          </MuiAccordion>

          <Box sx={{ pb: 1 }} />

          <Dialog
            title="Add Project"
            trigger={({ toggleOpen }) => (
              <Button
                variant="text"
                onClick={toggleOpen}
                startIcon={<AddIcon color="error" />}
                sx={{ pl: 2, justifyContent: "flex-start", color: "gray" }}
              >
                Add Project
              </Button>
            )}
            content={({ onClose }) => (
              <CreateProject onClose={onClose} onSubmit={onCreate} />
            )}
          />
        </>
      )}
    </Box>
  )
}

const Content = ({
  project,
  onCreate,
  onComplete,
}: {
  project?: any
  onCreate?: (task: any) => void
  onComplete?: (task: any) => void
}) => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (project) setTasks(project.tasks || [])
    else setTasks([])
  }, [project])

  return (
    <Box
      sx={(theme: Theme) => ({
        width: "100%",
        height: "100%",
        padding: theme.spacing(4),
      })}
    >
      <Title sx={{ ml: 5 }}>{project?.name}</Title>

      <Box sx={{ pb: 1 }} />

      {!project && "Select a project"}

      {tasks.map((task: any) => (
        <Task task={task} key={task._id} onComplete={onComplete} />
      ))}

      <Box sx={{ pb: 1 }} />

      {project && (
        <Dialog
          title="Add Task"
          trigger={({ toggleOpen }) => (
            <Button
              variant="text"
              onClick={toggleOpen}
              startIcon={<AddIcon color="error" />}
              sx={{ pl: 2, justifyContent: "flex-start", color: "gray" }}
            >
              Add Task
            </Button>
          )}
          content={({ onClose }) => (
            <CreateTask
              onClose={onClose}
              project={project}
              onSubmit={onCreate}
            />
          )}
        />
      )}
    </Box>
  )
}

const Task = ({
  task,
  onComplete,
}: {
  task?: any
  onComplete?: (task: any) => void
}) => {
  const [api] = useApi()

  const [loading, setLoading] = useState<boolean>(false)

  const markCompleted = async () => {
    try {
      setLoading(true)

      const body = {
        status: task.status === "completed" ? "pending" : "completed",
      }

      const response = await api({
        body,
        method: "PUT",
        uri: `${ENDPOINTS.tasks}/status/${task._id}`,
      })

      onComplete && onComplete(response?.data)
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={(theme: Theme) => ({
        display: "flex",
        flexDirection: "row",
        py: theme.spacing(1),
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Box sx={{ mr: 1 }}>
        <IconButton
          disabled={loading}
          onClick={markCompleted}
          color={task.status === "completed" ? "success" : "primary"}
        >
          <FiberManualRecordOutlinedIcon />
        </IconButton>
      </Box>

      <Box>
        <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
          {task.name}
        </Typography>
        <Typography variant="caption">
          {task.doneAt ? dayjs(task.doneAt).fromNow(true) : ""}
        </Typography>
      </Box>
    </Box>
  )
}

export default Home
