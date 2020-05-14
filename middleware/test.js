const {Company} = require('../models/company.model');
// const {User} = require('../models/user.model');
// const config = require('../configs/config.json');
async function get_company() {
    const companies = await Company.find({}).exec()
    if (!companies.length) {
        const new_company = new Company({
            name: 'TIM Test Company',
            address: '635 Harron Drive, Bel Air, MD 21014',
            phone: '443-512-0879',
            contact: 'support@tim.com'
        })
        return new_company.save()
    }
    return companies[0]
}

exports.get_company = get_company()