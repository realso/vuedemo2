 import { getWeek, datePart } from "rs-vcore/utils/Date";
 export default {
     getWeek(value) {
         return value ? (value + " " + getWeek(value)) : "";
     },
     toFixed(value, cm) {
         if (value == "0" || value != "") {
             return parseFloat(value || 0).toFixed(cm);
         }
     },
     datePart(value, c) {
         return datePart(value, c)
     }
 }