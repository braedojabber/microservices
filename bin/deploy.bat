ubuntu run rsync -rtzv --chmod=644 --exclude=.env --exclude=.git --exclude=.gitignore --exclude=bin --exclude=.pnpm-store --exclude=dist --exclude=node_modules ./ root@sitemaps.vcsr.ai:/var/opt/wf.vcsr.ai/