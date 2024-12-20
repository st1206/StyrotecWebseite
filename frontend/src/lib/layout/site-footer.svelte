<script lang="ts">
    import { Footer, FooterBrand, FooterLi, FooterUl, FooterCopyright, FooterIcon } from 'svelte-5-ui-lib';
    import { LinkedinSolid, YoutubeSolid, InstagramSolid } from "flowbite-svelte-icons";
  </script>
  
  <Footer class="bg-primary-600 size-full" footerType="socialmedia" >
    <div class="md:flex md:justify-between">
      <div class="mb-6 md:mb-0">
        <FooterBrand href="https://flowbite.com" src="" alt="Flowbite Logo" name="Styrotec" />
      </div>
      <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-2">
        <div>
          <h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">Resources</h2>
          <FooterUl>
            <FooterLi liClass="mb-4 text-primary-700" href="/">Flowbite</FooterLi>
            <FooterLi liClass="mb-4 text-primary-700" href="/">Tailwind CSS</FooterLi>
          </FooterUl>
        </div>
        <div>
          <h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">Follow us</h2>
          <FooterUl>
            <FooterLi liClass="mb-4 text-primary-700" href="/">GitHub</FooterLi>
            <FooterLi liClass="mb-4 text-primary-700" href="/">Discord</FooterLi>
          </FooterUl>
        </div>
        <div>
          <h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">Legal</h2>
          <FooterUl>
            <FooterLi liClass="mb-4 text-primary-700" href="/">Privacy Policy</FooterLi>
            <FooterLi liClass="mb-4 text-primary-700" href="/">Terms & Conditions</FooterLi>
          </FooterUl>
        </div>
      </div>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
    <div class="sm:flex sm:items-center sm:justify-between">
      <FooterCopyright href="/" by="Styrotec GmbH & Co KG" />
      
      <!-- Noch links zu social media einfügen-->

      <div class="mt-8 mb-4 flex space-x-10 sm:mt-0 sm:justify-center rtl:space-x-reverse">
        <FooterIcon href="/">
          <LinkedinSolid class="h-10 w-10 text-gray-500 hover:text-primary-700 dark:text-gray-500 dark:hover:text-white" />
        </FooterIcon>
        <FooterIcon href="/">
          <YoutubeSolid class="h-10 w-10 text-gray-500 hover:text-primary-700 dark:text-gray-500 dark:hover:text-white" />
        </FooterIcon>
        <FooterIcon href="/">
          <InstagramSolid class="h-10 w-10 text-gray-500 hover:text-primary-700 dark:text-gray-500 dark:hover:text-white" />
        </FooterIcon>
      </div>
    </div>
  </Footer>

<style>
    div{
        background-color: #33312E;
        color:#F6EDDE;
    }
    h2{
        color:#f6a312
    }
    
</style>