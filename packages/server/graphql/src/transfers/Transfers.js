/* eslint-disable prefer-spread */
class Transfers {
  constructor({ transfers }) {
    this.allRequests = transfers;
    this.validRequests = transfers.filter((transfer) => transfer.status === 'Y');
    this.pendingRequests = transfers.filter((transfer) => transfer.status === 'TBC');
    this.failedRequests = transfers.filter((transfer) => transfer.status === 'E');
  }

  validManagerRequests(manager) {
    return this.validRequests.filter((transfer) => transfer.manager === manager);
  }

  allManagerRequests(manager) {
    return this.allRequests.filter((transfer) => transfer.manager === manager);
  }

  pendingManagerRequests(manager) {
    return this.pendingRequests.filter((transfer) => transfer.manager === manager);
  }
}

export default Transfers;
