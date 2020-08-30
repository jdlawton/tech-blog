//This function takes a date that is automatically created by Sequelize when something is entered into the database and convertes it into a MM/DD/YY format
module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date (date).getFullYear()}`;
    }
}