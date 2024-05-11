FROM oven/bun:latest as base 
WORKDIR /usr/src/app

#install dep into temp directory
FROM base as install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev 
RUN cd /temp/dev && bun install --frozen-lockfile

#install with exlude devDependencies
FROM base as prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
RUN bun build ./index.ts --outdir ./build --target node

# RUN bun run build

FROM base as release
COPY --from=prerelease /usr/src/app/build .

USER bun
EXPOSE 5759/tcp
ENTRYPOINT ["bun","run","index.js"]
