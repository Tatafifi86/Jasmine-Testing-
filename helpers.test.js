describe("Helpers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    allPayments = {};
    billAmtInput.value = '100'
    tipAmtInput.value = '20'
    paymentId=1

    
  });

  it('sumPaymentTotal should create a sum of properties by type', function () {
    let curPayment = createCurPayment();
    allPayments['payment' + paymentId] = curPayment;
    
    let billAmt = sumPaymentTotal('billAmt');
    let tipAmt = sumPaymentTotal('tipAmt');
    let tipPercent = sumPaymentTotal('tipPercent');

    expect(billAmt).toEqual(100);
    expect(tipAmt).toEqual(20);
    expect(tipPercent).toEqual(20);
  });
  it('calculateTipPercent() should work properly', function () {
    let tipPercent = calculateTipPercent(567,45)
    expect(tipPercent).toEqual(8);
  });
  it('appendTd() should add td to tr properly', function () {
    let newTr = document.createElement('tr');

    let tipAverage = 23;

    appendTd(newTr, 'Lucy');
    appendTd(newTr, '$' + tipAverage.toFixed(2));

    serverTbody.append(newTr);
    expect(newTr.querySelector('td:first-child').innerText).toEqual('Lucy');
    expect(newTr.querySelector('td:nth-child(2)').innerText).toEqual('$23.00');
    newTr.remove()
  });
  it('last td in server row should have click event listener, appendDeleteBtn was added properly', function(){
    let curPayment = createCurPayment();
    allPayments['payment' + paymentId] = curPayment;
    appendPaymentTable(curPayment)
    let lastTd = paymentTbody.querySelector('tr td:last-child')
    let eventType = lastTd.click
    expect(eventType).toBeTruthy()
  })
  it('appendDeleteBtn should delete row and update summary', function(){
    let curPayment = createCurPayment();
    allPayments['payment' + paymentId] = curPayment;
    appendPaymentTable(curPayment)
    let lastTd = paymentTbody.querySelector('tr td:last-child')
    lastTd.click();
    expect(allPayments).toEqual({})
    expect(summaryTds[0].innerHTML).toEqual('$0');
    expect(summaryTds[1].innerHTML).toEqual('$0');
    expect(summaryTds[2].innerHTML).toEqual('0%');
  })

  afterEach(function() {
    // teardown logic
    allPayments = {};
    billAmtInput.value = ''
    tipAmtInput.value = ''
    paymentId=0
    updateSummary()
    paymentTbody.innerHTML = ''
  },1000);
});
