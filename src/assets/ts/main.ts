function showDeleteAlert() {
    if (!confirm('Do you want to delete?')) {
        return false;
    }

    return true;
}