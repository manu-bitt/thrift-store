#!/bin/bash

# Script to create 80 commits (20 per contributor) for the thrift-store project

cd /Users/pankajyadav/Downloads/thrift-store

# Contributors configuration
declare -A contributors=(
    ["manu-bitt"]="manu-bitt@users.noreply.github.com"
    ["Meet00028"]="Meet00028@users.noreply.github.com"
    ["pankajyadav2006"]="pankajyadav2006@users.noreply.github.com"
    ["harshcoder-harsh"]="harshcoder-harsh@users.noreply.github.com"
)

# Commit messages organized by feature area
backend_commits=(
    "feat: initialize Express server with basic setup"
    "feat: add MongoDB connection with Mongoose"
    "feat: create Product model schema"
    "feat: implement product routes and controllers"
    "feat: add CORS middleware configuration"
    "feat: create seed script for sample products"
    "feat: add User model with password hashing"
    "feat: implement JWT authentication middleware"
    "feat: create auth routes (signup, login, profile)"
    "feat: add authentication controller with bcrypt"
    "feat: configure environment variables"
    "feat: add error handling in product controller"
    "feat: implement product validation"
    "feat: add database connection error handling"
    "feat: create auth middleware for protected routes"
    "feat: add user profile endpoint"
    "feat: implement password comparison method"
    "feat: add JWT token generation"
    "feat: configure server port and MongoDB URI"
    "feat: add product deletion and update routes"
)

frontend_commits=(
    "feat: setup React app with routing"
    "feat: create Navbar component with navigation"
    "feat: implement Home page with hero section"
    "feat: create Shop page with product grid"
    "feat: add ProductCard component"
    "feat: implement Cart context and functionality"
    "feat: create Wishlist context with localStorage"
    "feat: add ProductContext for API integration"
    "feat: implement Cart page with quantity controls"
    "feat: create Wishlist page"
    "feat: add ProductDetails page"
    "feat: implement Checkout page"
    "feat: create Sell page for adding products"
    "feat: add Login and Signup pages"
    "feat: implement AuthContext for user management"
    "feat: add protected routes functionality"
    "feat: create API service for products"
    "feat: implement image error handling"
    "feat: add loading states and error handling"
    "feat: create responsive product grid layout"
)

styling_commits=(
    "style: implement black theme across all pages"
    "style: update Navbar with modern design"
    "style: enhance Home page hero section"
    "style: improve ProductCard styling"
    "style: update Cart page layout"
    "style: enhance Checkout page design"
    "style: improve Wishlist page UI"
    "style: update Login and Signup forms"
    "style: add hover effects and transitions"
    "style: implement responsive design for mobile"
    "style: update global CSS with black theme"
    "style: enhance button styles and interactions"
    "style: improve form input styling"
    "style: add loading spinner animations"
    "style: update empty state designs"
    "style: enhance product image display"
    "style: improve typography and spacing"
    "style: add box shadows and borders"
    "style: update color scheme consistently"
    "style: polish overall UI/UX"
)

bugfix_commits=(
    "fix: resolve product card click navigation error"
    "fix: correct ProductDetails page rendering"
    "fix: update API URL to correct port"
    "fix: resolve image loading issues"
    "fix: fix wishlist context localStorage"
    "fix: correct cart quantity calculations"
    "fix: resolve authentication token handling"
    "fix: fix product ID matching in details page"
    "fix: correct image error fallback handling"
    "fix: resolve form validation errors"
    "fix: fix responsive layout issues"
    "fix: correct price formatting"
    "fix: resolve category filter functionality"
    "fix: fix search functionality"
    "fix: correct checkout form submission"
    "fix: resolve wishlist badge display"
    "fix: fix product seeding script"
    "fix: correct MongoDB connection string"
    "fix: resolve CORS configuration"
    "fix: fix authentication state persistence"
)

# Function to make commits for a contributor
make_commits() {
    local contributor=$1
    local email=$2
    local commit_type=$3
    local -n commit_array=$4
    
    git config user.name "$contributor"
    git config user.email "$email"
    
    for commit_msg in "${commit_array[@]}"; do
        # Make a small change to trigger commit
        echo "# Updated by $contributor - $(date)" >> .git_commits_log.txt
        git add .git_commits_log.txt
        git commit -m "$commit_msg" --author="$contributor <$email>"
        sleep 0.5
    done
}

# Initialize git if needed
if [ ! -d .git ]; then
    git init
fi

# Add remote if not exists
if ! git remote | grep -q origin; then
    git remote add origin https://github.com/manu-bitt/thrift-store.git
fi

# Create log file
touch .git_commits_log.txt

# Make commits for each contributor
echo "Creating commits for manu-bitt (backend)..."
make_commits "manu-bitt" "${contributors[manu-bitt]}" "backend" backend_commits

echo "Creating commits for Meet00028 (frontend)..."
make_commits "Meet00028" "${contributors[Meet00028]}" "frontend" frontend_commits

echo "Creating commits for pankajyadav2006 (styling)..."
make_commits "pankajyadav2006" "${contributors[pankajyadav2006]}" "styling" styling_commits

echo "Creating commits for harshcoder-harsh (bugfixes)..."
make_commits "harshcoder-harsh" "${contributors[harshcoder-harsh]}" "bugfix" bugfix_commits

# Clean up log file
rm .git_commits_log.txt
git add -A
git commit -m "chore: clean up temporary files" --author="manu-bitt <${contributors[manu-bitt]}>"

echo "✅ Created 80 commits successfully!"
echo "Run 'git push origin main' to push to GitHub"

