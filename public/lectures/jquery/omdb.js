/**
 * Created by ryankalla on 6/7/17.
 */

(function (){

    jQuery(init);

    function init(){

        var inputField = $('#titleField');
        var searchButton = $('#searchButton');
        var resultsList = $('#resultsList');

        searchButton.click(handleSearchButton);

        var testResults = [
            {title: "t1", info : "i1"},
            {title: "t2", info : "i2"},
            {title: "t3", info : "i3"},
            {title: "t4", info : "i4"}
        ]


        function handleSearchButton(){
            var title = inputField.val();
            console.log(title);
            for(var m in testResults){
                var li = $('<li class="list-group-item">');
                li.append(testResults[m].title);
                resultsList.append(li);
            }
        }

    }

})();