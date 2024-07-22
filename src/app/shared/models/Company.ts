import { Address } from "./Address";
import { State } from "./State";

export interface Company {
  id?: number,
  companyName?: string,
  companyEmail?: string,
  companyPhone?: number,
  password?: string,
  address?: Address,
  state?: State,
}
