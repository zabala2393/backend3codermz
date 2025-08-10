import { Command } from "commander";

const args = new Command()

args.option(
    "--mode <mode>",
    "environment mode",
    "dev"
)

args.parse()

export default args.opts()