import "module-alias/register";

import { onRequest } from "firebase-functions/v2/https";
import appServices from "@services/app.services";

export const app = onRequest(appServices);
