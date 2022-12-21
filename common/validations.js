class validations {
    containsOnlyNumbers(str) {
        return /^\d+$/.test(str);
    }

}
export default new validations()

