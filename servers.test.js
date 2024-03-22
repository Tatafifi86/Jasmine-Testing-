describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });
  it('should add a new row to server table on updateServerTable()', function () {
    submitServerInfo();
    let row = document.querySelector('#server' + serverId);
    let td = row.querySelector('td')
    expect(td.innerText).toEqual('Alice');
  });

  afterEach(function() {
    // teardown logic
    serverNameInput.value = ''
    allServers = {}
    serverId = 0
    updateServerTable()
  },1000);
});
