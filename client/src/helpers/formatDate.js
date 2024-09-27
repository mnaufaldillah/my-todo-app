export const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return date.toLocaleDateString('id-ID', options);
}