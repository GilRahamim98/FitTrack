class validations {
    containsOnlyNumbers(str) {
        return /^[0-9][\.\d]*(,\d+)?$/.test(str);
    }
    checkIfTimeIsBefore(start, end) {
        const date1 = new Date('1970-01-01 ' + start);
        const date2 = new Date('1970-01-01 ' + end);

        return date1.getTime() < date2.getTime();
    }

}
export default new validations()

