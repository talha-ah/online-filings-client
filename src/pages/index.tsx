import React, { useState, useEffect } from "react"
import Head from "next/head"
import type { NextPage } from "next"

import Box from "@mui/material/Box"
import AddIcon from "@mui/icons-material/Add"

import TextField from "@mui/material/TextField"
import Accordion from "@mui/material/Accordion"
import Typography from "@mui/material/Typography"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemButton from "@mui/material/ListItemButton"

import { APP_NAME } from "@utils/constants"
import { Button } from "@components/Button"
import { Dialog } from "@components/Dialog"
import { useDebounce } from "@hooks/useDebounce"
import { IconButton } from "@components/IconButton"

const BASEURL = "http://localhost:5000/api/v1"

const Home: NextPage = () => {
  const [projects, setProjects] = useState([])
  const [project, setProject] = useState<any>(null)

  const [taskCreateLoading, setTaskCreateLoading] = useState(false)
  const [projectCreateLoading, setProjectCreateLoading] = useState(false)

  const onAddTask = async (name: string) => {
    try {
      if (!project) {
        alert("Select a project")
        return
      }

      setTaskCreateLoading(true)

      const response = await fetch(`${BASEURL}/tasks`, {
        body: JSON.stringify({
          name,
          projectId: project?._id,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) throw response

      const data = await response.json()

      const tasks = project.tasks || []

      tasks.push(data.data)

      setProject({
        ...project,
        tasks: tasks,
      })
    } catch (err) {
      console.log(err)
    } finally {
      setTaskCreateLoading(false)
    }
  }

  const onAddProject = async (name: string, dueAt: Date) => {
    try {
      setProjectCreateLoading(true)

      const response = await fetch(`${BASEURL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          dueAt,
        }),
      })

      if (!response.ok) throw response

      const data = await response.json()

      setProjects([data.data, ...projects])
    } catch (err) {
      console.log(err)
    } finally {
      setProjectCreateLoading(false)
    }
  }

  const fetchProjects = async (name?: string) => {
    try {
      const response = await fetch(`${BASEURL}/projects`)

      if (!response.ok) throw response

      const data = await response.json()

      setProjects(data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Header onAdd={onAddTask} loading={taskCreateLoading} />

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <SideBar
            projects={projects}
            onAdd={onAddProject}
            loading={projectCreateLoading}
            onSelect={(project) => setProject(project)}
          />
          <Tasks project={project} />
        </Box>
      </Box>
    </>
  )
}

const Header = ({
  onAdd,
  onSearch,
  loading = false,
}: {
  loading?: boolean
  onAdd: (args: string) => void
  onSearch?: (args: string) => void
}) => {
  const [name, setName] = useState("")

  const submitHandler = (event: any) => {
    event.preventDefault()

    onAdd(name)
  }

  const [query, setQuery] = useState("")

  const debouncedValue = useDebounce(query)

  useEffect(() => {
    onSearch && onSearch(debouncedValue)
    // eslint-disable-next-line
  }, [debouncedValue])

  return (
    <Box
      sx={{
        width: "100%",
        height: 64,
        backgroundColor: "red",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Box />
      <Box>
        <TextField
          id="search"
          name="search"
          value={query}
          onChange={(event: any) => setQuery(event.target.value)}
        />
      </Box>
      <Box>
        <Dialog
          title="Add Task"
          trigger={({ toggleOpen }) => (
            <IconButton onClick={toggleOpen}>
              <AddIcon />
            </IconButton>
          )}
          content={({ onClose }) => (
            <Box component="form" onSubmit={submitHandler}>
              <Box>
                <TextField
                  required
                  fullWidth
                  id="name"
                  autoFocus
                  name="name"
                  label="Name"
                  value={name}
                  onChange={(event: any) => setName(event.target.value)}
                />
              </Box>
              <Box
                sx={{
                  pt: 2,
                  gap: 2,
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={onClose} variant="text">
                  Cancel
                </Button>
                <Button type="submit" loading={loading} variant="text">
                  Create
                </Button>
              </Box>
            </Box>
          )}
        />
      </Box>
    </Box>
  )
}

const SideBar = ({
  onAdd,
  projects,
  onSelect,
  loading = false,
}: {
  projects: any[]
  loading: boolean
  onSelect: (args: any) => void
  onAdd: (name: string, dueAt: any) => void
}) => {
  const [name, setName] = useState("")
  const [dueAt, setDueAt] = useState<any>(null)

  const submitHandler = (event: any) => {
    event.preventDefault()

    onAdd(name, dueAt)

    setName("")
    setDueAt(null)
  }

  return (
    <Box
      sx={{
        width: 400,
        height: "100%",
        backgroundColor: "grey",
      }}
    >
      <Accordion variant="outlined" defaultExpanded={true}>
        <AccordionSummary id="panel1a-header" aria-controls="panel1a-content">
          <Box
            sx={{
              width: "100%",
              display: "flex",
              // end
            }}
          >
            <Typography>Accordion 1</Typography>
            <IconButton>
              <AddIcon />
            </IconButton>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {projects.map((project: any) => (
              <ListItem key={project._id} onClick={() => onSelect(project)}>
                <ListItemButton>
                  <ListItemText
                    primary={`${project.name} ${project.tasks.length}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      <Dialog
        title="Add Project"
        trigger={({ toggleOpen }) => (
          <Button startIcon={<AddIcon />} variant="text" onClick={toggleOpen}>
            Add Project
          </Button>
        )}
        content={({ onClose }) => (
          <Box component="form" onSubmit={submitHandler}>
            <Box>
              <TextField
                required
                fullWidth
                id="name"
                autoFocus
                name="name"
                label="Name"
                value={name}
                onChange={(event: any) => setName(event.target.value)}
              />
            </Box>
            <Box>
              <TextField
                required
                fullWidth
                id="dueAt"
                type="date"
                name="dueAt"
                label="Due At"
                value={dueAt}
                onChange={(event: any) => setDueAt(event.target.value)}
              />
            </Box>
            <Box
              sx={{
                pt: 2,
                gap: 2,
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={onClose} variant="text">
                Cancel
              </Button>
              <Button type="submit" loading={loading} variant="text">
                Create
              </Button>
            </Box>
          </Box>
        )}
      />
    </Box>
  )
}

const Tasks = ({ project }: { project?: any }) => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (project) {
      setTasks(project.tasks || [])
    }
  }, [project])

  return (
    <Box
      sx={{
        width: 400,
        height: "100%",
        backgroundColor: "grey",
        border: "1px solid #eaeaea",
      }}
    >
      {/* Check for empty */}
      {project
        ? tasks.map((task: any) => <Box key={task._id}>{task.name}</Box>)
        : "Select a project"}
    </Box>
  )
}

export default Home
