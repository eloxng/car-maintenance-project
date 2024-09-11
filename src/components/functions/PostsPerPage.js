// Template to display correct posts per page for pagination
export default function PostsPerPage(postType, currentPage, setCurrentPage, postsPerPage) {
        // Get current posts per page
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = postType.slice(indexOfFirstPost, indexOfLastPost);
        // Change page
        const paginate = (pageNumber) => setCurrentPage(pageNumber);

        return [currentPosts, paginate]; 
}
