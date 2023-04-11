const checkLogin = async () => {
    axios.get(`${config.BASE_PATH}checkLogin`)
    .then(res => {
        console.log(res)
    })
  }