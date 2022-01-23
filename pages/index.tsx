import { useState } from "react";
import { Layout, WalletOptionsModal } from "../components";
import Link from "next/link";
import Token from "../interfaces";

interface Props {
  tokens: Token[];
}

function List(props: Props) {
  const [showWalletOptions, setShowWalletOptions] = useState(false);

  return (
    <>
      <WalletOptionsModal
        open={showWalletOptions}
        setOpen={setShowWalletOptions}
      />

      <Layout
        showWalletOptions={showWalletOptions}
        setShowWalletOptions={setShowWalletOptions}
      >
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 overflow-hidden sm:py-24 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
              {props.tokens.map((token: Token, index: number) => {
                return (
                  <>
                    {token?.properties?.mimeType?.includes("audio") && (
                      <Link
                        key={index}
                        href={{
                          pathname: "/media/[id]",
                          query: { id: token.id },
                        }}
                      >
                        <a className="group text-sm">
                          <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100 group-hover:opacity-75">
                            <img
                              src={
                                token.image ||
                                "https://source.unsplash.com/ojBNiaeykwc/400x400"
                              }
                              alt="placeholder"
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <h3 className="mt-4 font-medium text-gray-900">
                            {token.name || "Untitled"}
                          </h3>
                          <p className="text-gray-500 italic">
                            {`${token.description.substring(0, 45)}...` ||
                              "No description"}
                          </p>
                        </a>
                      </Link>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const data = await fetch("http://localhost:3000/api/nft").catch((err) => {
    console.log(err);
  });
  const tokens = await data.json();
  return {
    props: {
      tokens,
    },
  };
}

export default List;
