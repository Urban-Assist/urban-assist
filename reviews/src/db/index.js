import {Sequelize} from 'sequelize'
const db = new Sequelize('reviews','root','vaibhav@admin',{
    host: 'localhost',
    dialect: 'mysql'
})

const connection = () => {
     db.authenticate().then(() => {
        console.log('Connection has been established successfully. ✅');

      }).catch(err => {
        console.error('Unable to connect to the database: ❌ ', err);
      }

    );
}

export{connection,db}
 