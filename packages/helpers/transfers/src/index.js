/* eslint-disable prefer-spread */
class Transfers {
  constructor({ transfers }) {
    const sortedTransfers = transfers.sort((t1, t2) => (new Date(t1.timestamp) - new Date(t2.timestamp)));
    this.allRequests = transfers || [];
    this.validRequests = sortedTransfers.filter((transfer) => transfer.status === 'Y') || [];
    this.pendingRequests = sortedTransfers.filter((transfer) => transfer.status === 'TBC') || [];
    this.failedRequests = sortedTransfers.filter((transfer) => transfer.status === 'E') || [];
  }

  validManagerRequests = (manager) => this.validRequests.filter((transfer) => transfer.manager === manager);

  allManagerRequests = (manager) => this.allRequests.filter((transfer) => transfer.manager === manager);

  pendingManagerRequests = (manager) => this.pendingRequests.filter((transfer) => transfer.manager === manager);
}

export default Transfers;
