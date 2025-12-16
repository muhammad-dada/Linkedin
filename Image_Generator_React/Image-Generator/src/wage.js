let wage = {
    firstname: "Muhammad",
    lastname: "dada",
    salary: 50_000,
    getwage:function(){
        return this.firstname + this.lastname + this.salary
    }
}

console.log(wage.getwage());