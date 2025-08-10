import { config } from "dotenv";
import argsHelpers from "./args.helper.js";

const path = ".env." + argsHelpers.mode
config({ path })