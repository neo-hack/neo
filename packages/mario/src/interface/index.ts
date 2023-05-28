import type Debug from 'debug'

export type WebhookEvent = string

export interface Step {
  /**
   * A name for your step to display on GitHub.
   */
  name?: string
  /**
   * TODO: dynamic load action not support now
   * Selects an action to run as part of a step in your job. An action is a reusable unit of code. You can use follow built-in actions
   * - replace
   * - copy
   * - mv
   * - rm
   */
  uses?: string
  /**
   * A map of the input parameters defined by the action. Each input parameter is a key/value pair. Input parameters are set as environment variables. The variable is prefixed with INPUT_ and converted to upper case.
   */
  with?: {
    [k: string]: unknown
  }
  /**
   * TODO: env setup not support now
   * Sets environment variables for steps to use in the virtual environment. Public actions may specify expected environment variables in the README file. If you are setting a secret in an environment variable, you must set secrets using the secrets context.
   */
  env?: {
    [k: string]: unknown
  }
  /**
   * TODO: condition not support
   * Identifies any steps that must complete successfully before this step will run. It can be a string or an array of strings. If a step fails, all steps that need it will also fail unless the steps use a conditional statement that causes the step to continue.
   */
  if?: string
  /**
   * Runs command line programs using the operating system's shell. If you do not provide a name, the step name will default to the run command. Commands run using non-login shells by default.
   */
  run?: string
  /**
   * TODO: working-directory not support
   * The default directory that the action uses in a job's workspace.
   */
  'working-directory'?: string
  /**
   * Prevents a job from failing when a step fails. Set to true to allow a job to pass when this step fails.
   */
  'continue-on-error'?: boolean
}

/**
 * Each job must have an id to associate with the job. The key job_id is a string and its value is a map of the job's configuration data. You must replace <job_id> with a string that is unique to the jobs object. The <job_id> must start with a letter or _ and contain only alphanumeric characters, -, or _.
 */
export interface Job {
  /**
   * The name of the job displayed on GitHub.
   */
  name?: string
  /**
   * Path patterns of the job
   */
  paths?: string
  /**
   * Identifies any jobs that must complete successfully before this job will run. It can be a string or array of strings. If a job fails, all jobs that need it will also fail unless the jobs use a conditional statement that causes the job to continue.
   */
  /**
   * A job contains a sequence of tasks called steps. Steps can run commands, run setup tasks, or run an action in your repository, a public repository, or an action published in a Docker registry. Not all steps run actions, but all actions are run as a step. Each step runs in its own process in the virtual environment and has access to the workspace and filesystem. Because steps are run in their own process, changes to environment variables are not preserved between steps. GitHub provides built-in steps to set up and complete a job.
   */
  steps?: Step[]
}

export interface Workflow {
  /**
   * The name of your workflow. GitHub displays the names of your workflows on your repository's actions page. If you omit this field, GitHub sets the name to the workflow's filename.
   */
  name?: string
  /**
   * A workflow run is made up of one or more jobs. Jobs run in parallel by default. To run jobs sequentially, you can define dependencies on other jobs using the jobs.<job_id>.needs keyword.
   */
  jobs?: Record<string, Job>
}

export interface Context {
  cwd: string
  debug: Debug.Debugger
  variables?: Record<string, any>
}

export type Action<T = Record<string, string>> = (args: T, ctx: Context) => any
