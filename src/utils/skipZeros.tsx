import { TokenModel } from "src/service/Data"


export const skipZeros = (token: TokenModel) => !isNaN(token.units) && token.value != 0
