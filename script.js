let invoiceItems = [];

function addItem() {
  const product = document.getElementById('product').value;
  const qty = parseInt(document.getElementById('qty').value);
  const price = parseFloat(document.getElementById('price').value);

  if (!product || qty <= 0 || price <= 0) {
    alert('Please enter valid product, quantity, and price.');
    return;
  }

  invoiceItems.push({ product, qty, price });
  renderTable();

  // Clear input fields
  document.getElementById('product').value = '';
  document.getElementById('qty').value = '';
  document.getElementById('price').value = '';
}

function renderTable() {
  const tbody = document.getElementById('invoiceBody');
  tbody.innerHTML = '';

  let subtotal = 0;

  invoiceItems.forEach((item, index) => {
    const total = item.qty * item.price;
    subtotal += total;

    const row = `<tr>
      <td>${item.product}</td>
      <td>${item.qty}</td>
      <td>₹${item.price.toFixed(2)}</td>
      <td>₹${total.toFixed(2)}</td>
      <td><button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Delete</button></td>
    </tr>`;
    tbody.innerHTML += row;
  });

  const gstAmount = subtotal * 0.18;
  const grandTotal = subtotal + gstAmount;

  document.getElementById('subtotal').innerText = `Subtotal: ₹${subtotal.toFixed(2)}`;
  document.getElementById('gst').innerText = `GST (18%): ₹${gstAmount.toFixed(2)}`;
  document.getElementById('total').innerText = `Total: ₹${grandTotal.toFixed(2)}`;
}

function removeItem(index) {
  invoiceItems.splice(index, 1);
  renderTable();
}

function downloadPDF() {
  const element = document.getElementById("invoice");
  html2pdf().from(element).save("invoice.pdf");
}
