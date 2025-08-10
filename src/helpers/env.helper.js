import { config } from "dotenv";
import argsHelpers from "./args.helpers.js";

const path = ".env." + argsHelpers.mode
config({ path })