const LocalBank = JSON.parse(localStorage.getItem('bank')) || {account: { person: [], company: [] }};
const type = 'person';
export default {
    data() {
        return {
            type,
            bank: LocalBank,
            bankAccount: LocalBank.account,
            person: LocalBank.account.person,
            company: LocalBank.account.company,
            account: LocalBank.account[type],
            members: LocalBank.account[type].map(item => item.name),
        }
    },
    watch: {
        '$route.query.type'(type) {
            this.type = type;
        },
        type(type) {
            this.account = this.bankAccount[type];
            this.members = this.bankAccount[type].map(item => item.name);
        },
    },
    created() {
        this.type = this.$route.query.type;
        this.account = this.bankAccount[this.type];
        this.members = this.bankAccount[this.type].map(item => item.name);
    },
    methods: {
        save() {
            const json = JSON.stringify(this.bank);
            localStorage.setItem('bank', json );
        },
        add(data, type) {
            const account = type ? this.bankAccount[type] : this.account;
            account.push(data);
            this.save();
        },
        modify(data, type) {
            const account = type ? this.bankAccount[type] : this.account;
            let modifyAccount = account.filter(item => item.name === data.name)[0];
            Object.assign(modifyAccount, data);
            this.save();
        },
        deleteMember(data, type) {
            const account = type ? this.bankAccount[type] : this.account;
            let deleteAccount = account.filter(item => item.name === data.name)[0];
            const index = account.indexOf(deleteAccount);
            account.splice(index, 1);
            this.save();
        }
    }
}
