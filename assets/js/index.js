$("#add_user").submit(function (event) {
  alert(
    "Data Inserted Successfully in the DataBase & Anytime you can Update it"
  );
});

$("#update_user").submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {};

  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];

    var request = {
      url: `http://localhost:1230/api/users/${data.id}`,
      method: "PUT",
      data: data,
    };

    $.ajax(request).done(function (response) {
      // alert("Data Updated Successfully & Anytime you can Update it");
    });
  });
});

if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");

    var request = {
      url: `http://localhost:1230/api/users/${id}`,
      method: "DELETE",
    };

    if (
      confirm(
        "User Details will be permenantly Deleted, if you want to delete this id ?"
      )
    ) {
      $.ajax(request).done(function (response) {
        alert("Data Deleted Successfully");
        location.reload();
      });
    }
  });
}
