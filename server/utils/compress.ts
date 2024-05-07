import { spawn } from "child_process";

const command = "ls";
const args = ["-lah"];

const createChildProcess = () => {
  const childProcess = spawn(command, args);

  childProcess.stdout.on("data", (data: any) => {
    console.log(`stdout: ${data}`);
  });

  childProcess.stderr.on("data", () => {
    console.error("something went wrong!");
  });

  childProcess.on("close", (code) => {
    console.log(`child process exited code ${code}`);
  });
};
export default createChildProcess;
