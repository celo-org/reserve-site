import { TokenModel } from "src/service/Data"

export const skipZeros = (token: TokenModel) => token.value != 0
