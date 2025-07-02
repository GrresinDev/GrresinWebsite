import type { PostModelThumbNail } from '$lib/interface/post';
import type { ProjectWithThumbNail } from '$lib/interface/project';
import FlexSearch from 'flexsearch';

// Declare the FlexSearch indices and data arrays
let postsIndex: FlexSearch.Index;
let projectIndex: FlexSearch.Index;
let posts: PostModelThumbNail[];
let projects: ProjectWithThumbNail[];


export function createPostsIndex(data: PostModelThumbNail[]) {
    postsIndex = new FlexSearch.Index({ tokenize: 'forward' });

    data.forEach((post, i) => {
        // Include both English and Arabic titles and descriptions for indexing
        const item = `${post.title} ${post.desc} ${post.title_ar} ${post.desc_ar}`;
        postsIndex.add(i, item);
    });

    posts = data;
}

export function createProjectIndex(data: ProjectWithThumbNail[]) {
    projectIndex = new FlexSearch.Index({ tokenize: 'forward' });

    data.forEach((project, i) => {
        // Include both English and Arabic titles and descriptions for indexing
        const item = `${project.title} ${project.desc} ${project.title_ar} ${project.desc_ar}`;
        projectIndex.add(i, item);
    });

    projects = data;
}


export function searchPostsIndex(searchTerm: string) {
    // Escape special characters in the search term for regex
    const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const results = postsIndex.search(match);

    return results
        .map((index) => posts[index as number])
        .map(({ slug, title, desc, title_ar, desc_ar }) => {
            return {
                slug,
                title: replaceTextWithMarker(title, match),
                title_ar: replaceTextWithMarker(title_ar, match), // Add Arabic title
                content: getMatches(desc, match),
                content_ar: getMatches(desc_ar, match) // Add Arabic content
            };
        });
}


export function searchProjectIndex(searchTerm: string) {
    const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const results = projectIndex.search(match);

    return results
        .map((index) => projects[index as number])
        .map(({ slug, title, desc, title_ar, desc_ar }) => {
            return {
                slug,
                title: replaceTextWithMarker(title, match),
                title_ar: replaceTextWithMarker(title_ar, match), // Add Arabic title
                content: getMatches(desc, match), // Using description as content for projects
                content_ar: getMatches(desc_ar, match) // Add Arabic content
            };
        });
}

function replaceTextWithMarker(text: string, match: string) {
    const regex = new RegExp(match, 'gi');
    return text.replaceAll(regex, (matchedText) => `<mark>${matchedText}</mark>`);
}


function getMatches(text: string, searchTerm: string, limit = 1) {
    const regex = new RegExp(searchTerm, 'gi');
    const indexes = [];
    let matchesFound = 0;
    let match;

    while ((match = regex.exec(text)) !== null && matchesFound < limit) {
        indexes.push(match.index);
        matchesFound++;
    }

    return indexes.map((index) => {
        const start = Math.max(0, index - 20);
        const end = Math.min(text.length, index + 80);
        const excerpt = text.substring(start, end).trim();
        return `...${replaceTextWithMarker(excerpt, searchTerm)}...`;
    });
}

// You might also want a combined search function if you want to search both simultaneously
export function searchAll(searchTerm: string) {
    const postResults = searchPostsIndex(searchTerm);
    const projectResults = searchProjectIndex(searchTerm);

    return {
        posts: postResults,
        projects: projectResults
    };
}