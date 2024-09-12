$(document).ready(function () {
    $('#operationForm').submit(function (e) {
        e.preventDefault();
        const operationData = {
            amount: Math.abs($('#amount').val()),
            type: $('#type').val(),
            comment: $('#comment').val(),
        };
        $.ajax({
            type: 'POST',
            url: '/api/operations',
            data: JSON.stringify(operationData),
            contentType: 'application/json',
            success: function () {
                $('#amount').val('');
                $('#comment').val('');
                loadOperations();
            },
            error: function (xhr) {
                if (xhr.status === 401) {
                    alert('Session expired. Please login again.');
                    window.location.href = '/';
                } else {
                    alert('Failed to add operation');
                }
            },
        });
    });
});



function loadOperations() {
    $.ajax({
        type: 'GET',
        url: '/api/operations',
        success: function (data) {
            updateOperationsTable(data.operations);
            $('#totalIncome').text(data.totalIncome);
            $('#totalExpense').text(data.totalExpense);
        },
        error: function (xhr) {
            if (xhr.status === 401) {
                alert('Session expired. Please login again.');
                window.location.href = '/';
            } else {
                alert('Failed to load operations');
            }
        },
    });
}

function updateOperationsTable(operations) {
    const tableBody = $('#operationsTable tbody');
    tableBody.empty();
    operations.forEach((operation) => {
        const row = `
        <tr>
          <td>${new Date(operation.date).toLocaleString()}</td>
          <td>${operation.type === "income"? "доход" : "расход"}</td>
          <td>${operation.amount}</td>
          <td>${operation.comment}</td>
          <td><button class="delete-operation" data-id="${operation._id}">Delete</button></td>
        </tr>`;
        tableBody.append(row);
    });

    $('.delete-operation').click(function () {
        const operationId = $(this).data('id');
        $.ajax({
            type: 'DELETE',
            url: `/api/operations/${operationId}`,
            success: function () {
                loadOperations();
            },
            error: function () {
                alert('Failed to delete operation');
            },
        });
    });
}
