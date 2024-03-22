describe("Payment test (with setup and tear-down)", function() {
  let curPayment=null
  beforeEach(function () {
    // initialization logic
    allPayments = {};
    billAmtInput.value = '100'
    tipAmtInput.value = '20'
    paymentId=1
    curPayment = createCurPayment();
    allPayments['payment' + paymentId] = curPayment;

    
  });




  it('updateSummary() should properly update the total row', function () {
    allPayments['payment' + paymentId+1] = curPayment;
    updateSummary()

    expect(summaryTds[0].innerHTML).toEqual('$200');
    expect(summaryTds[1].innerHTML).toEqual('$40');
    expect(summaryTds[2].innerHTML).toEqual('20%');
  });
  it('appendPaymentTable() should add tr to the table', function () {

    appendPaymentTable(curPayment)
    expect(paymentTbody.querySelector(`#payment${paymentId} td:first-child`).innerText).toEqual('$100');
  });
  it('createCurPayment should have all necasssary key properties',function(){
    expect(curPayment.hasOwnProperty('billAmt')).toBeTruthy()
    expect(curPayment.hasOwnProperty('tipAmt')).toBeTruthy()
    expect(curPayment.hasOwnProperty('tipPercent')).toBeTruthy()
  })
  it('submitPaymentInfo should clear all inputs',function(){
    submitPaymentInfo()
    expect(billAmtInput.value).toEqual('')
    expect(tipAmtInput.value).toEqual('')
  })

  afterEach(function() {
    // teardown logic
    allPayments = {};
    billAmtInput.value = ''
    tipAmtInput.value = ''
    paymentId=0
    updateSummary()
  },1000);
 
});
