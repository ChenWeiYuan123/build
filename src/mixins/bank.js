const LocalAccount = JSON.parse(localStorage.getItem('bank')) || {account: []};
export default {
    data() {
        return {
            account: LocalAccount.account,
            members: LocalAccount.account.map(item => item.name),
        }
    },
    methods: {
        save() {
            const json = JSON.stringify({ account: this.account });
            localStorage.setItem('bank', json );
        },
        add(data) {
            this.account.push(data);
            this.save();
        },
        modify(data) {
            let modifyAccount = this.account.filter(item => item.name === data.name)[0];
            Object.assign(modifyAccount, data);
            this.save();
        },
        deleteMember(data) {
            let deleteAccount = this.account.filter(item => item.name === data.name)[0];
            const index = this.account.indexOf(deleteAccount);
            this.account.splice(index, 1);
            this.save();
        }
    }
}