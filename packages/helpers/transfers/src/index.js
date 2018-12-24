/* eslint-disable prefer-spread */
class Transfers {
  constructor({ transfers }) {
    this.allRequests = transfers || [];
    this.validRequests = transfers.filter((transfer) => transfer.status === 'Y') || [];
    this.pendingRequests = transfers.filter((transfer) => transfer.status === 'TBC') || [];
    this.failedRequests = transfers.filter((transfer) => transfer.status === 'E') || [];
  }

  validManagerRequests = (manager) => this.validRequests.filter((transfer) => transfer.manager === manager);

  allManagerRequests = (manager) => this.allRequests.filter((transfer) => transfer.manager === manager);

  pendingManagerRequests = (manager) => this.pendingRequests.filter((transfer) => transfer.manager === manager);
}

export default Transfers;
