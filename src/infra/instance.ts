import { gcpConfig } from "./gcpConfig"
import { execSync } from 'child_process'

export function start(): void {
  const command = createCommand("start")
  execSync(command)
}

export function stop(): void {
  const command = createCommand("stop")
  execSync(command)
}

function createCommand(cmd: "start" | "stop"): string {
  return `/snap/bin/gcloud --account=${gcpConfig.servece_account_id} compute instances ${cmd} ${gcpConfig.minecraft_instance_id} --project ${gcpConfig.gcp_project_id} --zone ${gcpConfig.minecraft_instance_zone}`
}
