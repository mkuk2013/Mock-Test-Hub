// Main Application Logic

document.addEventListener('DOMContentLoaded', async () => {
    updateNavAuth();
});

async function updateNavAuth() {
    if (!supabase) return;

    const { data: { session } } = await supabase.auth.getSession();
    const navContainer = document.querySelector('nav .hidden.md\\:block .flex.items-center.space-x-8');
    const mobileNavContainer = document.querySelector('#mobile-menu .space-y-2');

    if (session) {
        // User is logged in
        const user = session.user;
        const name = user.user_metadata.full_name || 'User';

        // Desktop Nav
        if (navContainer) {
            // Remove Login/Get Started buttons
            const buttons = navContainer.querySelectorAll('button');
            buttons.forEach(btn => btn.remove());

            // Add Profile/Logout
            const profileHtml = `
                <div class="relative group">
                    <button class="flex items-center gap-2 text-white hover:text-indigo-300 font-medium text-sm focus:outline-none">
                        <img src="https://ui-avatars.com/api/?name=${name}&background=random" class="w-8 h-8 rounded-full border border-white/20">
                        <span>${name}</span>
                        <i class="fas fa-chevron-down text-xs"></i>
                    </button>
                    <div class="absolute right-0 mt-2 w-48 bg-[#1E293B] border border-white/10 rounded-xl shadow-xl overflow-hidden hidden group-hover:block slide-up">
                        <a href="#" class="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">My Profile</a>
                        <a href="#" class="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">My Courses</a>
                        <div class="border-t border-white/10"></div>
                        <button onclick="handleLogout()" class="block w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 transition-colors">Sign Out</button>
                    </div>
                </div>
            `;
            navContainer.insertAdjacentHTML('beforeend', profileHtml);
        }

        // Mobile Nav
        if (mobileNavContainer) {
            // Remove Login/Get Started buttons (last button usually)
            const btn = mobileNavContainer.querySelector('button');
            if (btn) btn.remove();

            const mobileProfileHtml = `
                <div class="border-t border-white/10 pt-4 mt-4">
                    <div class="flex items-center gap-3 px-3 mb-3">
                        <img src="https://ui-avatars.com/api/?name=${name}&background=random" class="w-10 h-10 rounded-full border border-white/20">
                        <div>
                            <p class="text-white font-bold">${name}</p>
                            <p class="text-xs text-gray-400">${user.email}</p>
                        </div>
                    </div>
                    <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10">My Courses</a>
                    <button onclick="handleLogout()" class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-white/10">Sign Out</button>
                </div>
             `;
            mobileNavContainer.insertAdjacentHTML('beforeend', mobileProfileHtml);
        }

    } else {
        // User is not logged in - Ensure Login button links to auth.html
        if (navContainer) {
            const loginBtn = Array.from(navContainer.querySelectorAll('button')).find(b => b.textContent.includes('Log in'));
            if (loginBtn) {
                loginBtn.onclick = () => window.location.href = 'auth.html';
            }
            // Update Get Started to link to auth.html (signup)
            const getStartedBtn = Array.from(navContainer.querySelectorAll('button')).find(b => b.textContent.includes('Get Started'));
            if (getStartedBtn) {
                getStartedBtn.onclick = () => window.location.href = 'auth.html';
            }
        }

        if (mobileNavContainer) {
            const getStartedBtn = mobileNavContainer.querySelector('button');
            if (getStartedBtn) {
                getStartedBtn.onclick = () => window.location.href = 'auth.html';
            }
        }
    }
}

async function handleLogout() {
    if (!supabase) return;

    const { error } = await supabase.auth.signOut();
    if (!error) {
        window.location.reload();
    }
}
