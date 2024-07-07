import { applyDecorators, UseGuards } from "@nestjs/common";

import { ApiSecurity } from "@nestjs/swagger";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";


export const Auth=()=>applyDecorators(ApiSecurity('Authorization'),UseGuards(AuthGuard))