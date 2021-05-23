const axios = require('axios');

(async () => {
  try {
    const data = await axios.post('http://localhost:3000/users/register', {
      username: 'JohnInTheJungle1',
      password: 'password123',
      name: 'JohnBruno',
      seller: true,
      phone: '+79999999999',
      email: 'yaya@ya.ru',
      address: {
        addr1: 'First address',
        addr2: 'Second address',
        city: 'SPB',
        state: '',
        country: 'Russia',
        zip: '123321',
      },
      description: 'Some information about a user',
      status: 'Verified',
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
})();
