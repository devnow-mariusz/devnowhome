export enum RegEx {
  PHONE = "^\\+?(\\d{1,3})?[-.\\s]?\\(?\\d{1,4}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$",
  POSTAL_CODE = "^\\d{2}-\\d{3}$",
  NIP = "^(?:\\d{10}|\\d{3}-\\d{3}-\\d{2}-\\d{2})$",
}
