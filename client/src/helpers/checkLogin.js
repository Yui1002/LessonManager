import axios from "axios";

export function checkLogin(cb) {
  axios
    .get(`${config.BASE_PATH}checkLogin`)
    .then(() => {
      cb();
    })
    .catch((err) => {
      cb();
      return;
    });
}
