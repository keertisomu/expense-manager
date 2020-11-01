export class DateUtility{

    //convert string date to format yyyy/mm/dd format.
    static getFormattedDate(date){
        var dtCreated = new Date(date);
        var dd = String(dtCreated.getDate()).padStart(2, '0');
        var mm = String(dtCreated.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = dtCreated.getFullYear();
        var formattedDt = yyyy + '/' + mm + '/' + dd;
    
        return formattedDt;
    }
}