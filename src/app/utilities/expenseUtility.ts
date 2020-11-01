export class ExpenseUtility{
     static enumSelector(definition) {
        return Object.keys(definition)
          .map(key => ({ value: definition[key], title: key }));
      }

}