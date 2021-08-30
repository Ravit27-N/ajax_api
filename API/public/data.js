$("document").ready(function(){        
  getdata();


  function getdata(){
    $.ajax({
      type: 'GET',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'http://localhost:5000',            
      success: function(res) {
        console.log('success');
        console.log(JSON.stringify(res.rows));
        var temp = ""
        $.each(res.rows,function(index,data){
          temp +="<tr>"
          temp +="<th scope='row'>"+ data.id +"</td>"
          temp +="<td>"+ data.first_name +"</td>"
          temp +="<td>"+ data.last_name +"</td>"
          temp +="<td>"+ data.email +"</td>"
          temp +="<td>"+ data.phone +"</td>"
          temp +=" <td class='text-end'>"
          temp +="<a href='/viewuser/"+  data.id  +"'type='button' class='btn btn-lightbtn-small'><i class='bi bi-eye'></i> View</a>"
          temp +="<a href='/edituser/"+ data.id  +"'type='button' class='btn btn-lightbtn-small'><i class='bi bi-eye'></i>  Edit</a>"
          temp += "<a href='/"+ data.id  +"'type='button' class='btn btn-lightbtn-small'><i class='bi bi-eye'></i> Delete</a>"
          temp +="</td><tr>"
        })
        // $("tbody").append(JSON.stringify(data));
        $("tbody").append(temp);
      }
    });
  }
});



