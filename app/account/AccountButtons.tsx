import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModeToggle } from "@/components/ui/ModeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { GearIcon, ExitIcon } from "@radix-ui/react-icons";
import { useMetric } from "@/hooks/useMetric";
import { logout } from "@/lib/users";
import { useTranslation } from "react-i18next";
export const AccountButtons = () => {
  const { t } = useTranslation();
  const { isMetric, toggleMetric } = useMetric();
  return (
    <div className="absolute flex w-12 gap-2 text-3xl right-24 top-4">
      <Button variant={"ghost"} className="text-3xl" onClick={logout}>
        <ExitIcon className="h-6 w-6 " />
        <span className="sr-only">Log out</span>
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"ghost"} className="text-3xl">
            <GearIcon className="h-6 w-6 " />
            <span className="sr-only">Settings</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex items-center sm:w-96 w-80">
          <ul className="flex flex-col items-center justify-center w-full py-2 mx-4 my-2 text-sm">
            <li className="flex items-center justify-between w-full py-2">
              <p>{t("accountPage.theme.title")}</p>
              <ModeToggle />
            </li>
            <li className="flex items-center justify-between w-full gap-4 py-2">
              <p>{t("accountPage.language.title")}</p>
              <div className="w-1/2">
                <LanguageSwitcher />
              </div>
            </li>
            <li className="flex items-center justify-between w-full gap-4 py-2">
              <p>{t("accountPage.units.title")}</p>
              <div className="w-1/2">
                <Select
                  name="units"
                  value={isMetric ? "metric" : "us"}
                  onValueChange={toggleMetric}
                >
                  <SelectTrigger className="full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">
                      {t("accountPage.units.us")}
                    </SelectItem>
                    <SelectItem value="metric">
                      {t("accountPage.units.metric")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};
