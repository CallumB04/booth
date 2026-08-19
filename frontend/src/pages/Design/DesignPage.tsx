import { useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import {
    EllipsisVerticalIcon,
    InboxIcon,
    PlusIcon,
    TrashIcon,
} from "lucide-react";
import AppLogo from "../../components/AppLogo/AppLogo";
import AvatarStack from "../../components/AvatarStack/AvatarStack";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Checkbox from "../../components/Checkbox/Checkbox";
import Chip from "../../components/Chip/Chip";
import ClickableGroup from "../../components/ClickableGroup/ClickableGroup";
import ClickableText from "../../components/Text/ClickableText";
import CodeInput from "../../components/CodeInput/CodeInput";
import SearchPopup from "../../components/SearchPopup/SearchPopup";
import CountBadge from "../../components/CountBadge/CountBadge";
import DatePicker from "../../components/DatePicker/DatePicker";
import Divider from "../../components/Divider/Divider";
import Dropdown from "../../components/Dropdown/Dropdown";
import EmptyStateCard from "../../components/EmptyStateCard/EmptyStateCard";
import FactChip from "../../components/FactChip/FactChip";
import FileUpload from "../../components/FileUpload/FileUpload";
import Input from "../../components/Input/Input";
import InputLabel from "../../components/Text/InputLabel";
import LinkButton from "../../components/Button/LinkButton";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import MonoLabel from "../../components/Text/MonoLabel";
import MultiSelect from "../../components/MultiSelect/MultiSelect";
import Navigator from "../../components/Navigator/Navigator";
import Page from "../../components/Page/Page";
import PageHeader from "../../components/Page/PageHeader";
import Panel from "../../components/Panel/Panel";
import PanelRow from "../../components/Panel/PanelRow";
import Popout from "../../components/Popout/Popout";
import Popup from "../../components/Popup/Popup";
import PriorityFlag from "../../components/PriorityTag/PriorityFlag";
import PriorityTag from "../../components/PriorityTag/PriorityTag";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import RadioGroup from "../../components/RadioGroup/RadioGroup";
import SearchBar from "../../components/SearchBar/SearchBar";
import Section from "../../components/Section/Section";
import SideNav from "../../components/SideNav/SideNav";
import StatCard from "../../components/StatCard/StatCard";
import StatusDot from "../../components/StatusDot/StatusDot";
import StatusTag from "../../components/StatusTag/StatusTag";
import Tag from "../../components/Tag/Tag";
import Textarea from "../../components/Textarea/Textarea";
import Timeline from "../../components/Timeline/Timeline";
import TimelineItem from "../../components/Timeline/TimelineItem";
import TimePicker from "../../components/TimePicker/TimePicker";
import Toggle from "../../components/Toggle/Toggle";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import type { UserProfile } from "../../api/profiles";
import {
    ALL_CUSTOM_APP_COLORS,
    type CustomAppColor,
} from "../../constants/colors";
import { BUTTON_ICON_SIZE } from "../../constants/icons";
import { usePopup } from "../../contexts/PopupContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useUser } from "../../contexts/UserContext";
import {
    createOrganisation,
    fetchOrganisationMembers,
    fetchOrganisations,
    type Organisation,
    type OrganisationMember,
} from "../../api";
import { updateUserProfile } from "../../api/profiles";
import { markNotificationAsRead } from "../../api/notifications";
import { signIn, signUp } from "../../supabase/users";
import usePageTitle from "../../hooks/usePageTitle";

/**
 * Internal reference of every token and component in the app.
 * Not linked from the navigation - reach it directly at /design.
 * Every tab lives in this one file on purpose: it is a test surface, not app code.
 */

const TABS = [
    "components",
    "colour",
    "type",
    "foundations",
    "testing",
] as const;

type Tab = (typeof TABS)[number];

// Held outside the component, Navigator resets its selection when options change identity
const TAB_OPTIONS = TABS.map((tab) => ({ label: tab }));

// Swatch classes are written out in full, tailwind only picks up literal class names
type ColourToken = {
    token: string;
    swatch: string;
};

type ColourGroup = {
    label: string;
    tokens: ColourToken[];
};

const COLOUR_GROUPS: ColourGroup[] = [
    {
        label: "brand",
        tokens: [
            { token: "highlight", swatch: "bg-highlight" },
            { token: "highlight-hover", swatch: "bg-highlight-hover" },
            { token: "highlight-bright", swatch: "bg-highlight-bright" },
            { token: "highlight-soft", swatch: "bg-highlight-soft" },
            { token: "highlight-dim", swatch: "bg-highlight-dim" },
            { token: "highlight-on", swatch: "bg-highlight-on" },
        ],
    },
    {
        label: "text",
        tokens: [
            { token: "text-display", swatch: "bg-text-display" },
            { token: "text-primary", swatch: "bg-text-primary" },
            { token: "text-secondary", swatch: "bg-text-secondary" },
            { token: "text-tertiary", swatch: "bg-text-tertiary" },
            { token: "text-disabled", swatch: "bg-text-disabled" },
            { token: "text-faint", swatch: "bg-text-faint" },
        ],
    },
    {
        label: "surfaces",
        tokens: [
            { token: "background", swatch: "bg-background" },
            { token: "rail", swatch: "bg-rail" },
            { token: "surface", swatch: "bg-surface" },
            { token: "surface-muted", swatch: "bg-surface-muted" },
            { token: "surface-raised", swatch: "bg-surface-raised" },
            { token: "surface-hover", swatch: "bg-surface-hover" },
        ],
    },
    {
        label: "borders",
        tokens: [
            { token: "layout-border", swatch: "bg-layout-border" },
            { token: "surface-border", swatch: "bg-surface-border" },
            {
                token: "surface-border-hover",
                swatch: "bg-surface-border-hover",
            },
            { token: "input-border", swatch: "bg-input-border" },
            { token: "input-border-hover", swatch: "bg-input-border-hover" },
            { token: "popup-border", swatch: "bg-popup-border" },
        ],
    },
    {
        label: "state",
        tokens: [
            { token: "success", swatch: "bg-success" },
            { token: "warning", swatch: "bg-warning" },
            { token: "danger", swatch: "bg-danger" },
            { token: "danger-soft", swatch: "bg-danger-soft" },
        ],
    },
    {
        label: "ticket status",
        tokens: [
            { token: "ticket-resolved", swatch: "bg-ticket-resolved" },
            { token: "ticket-in-progress", swatch: "bg-ticket-in-progress" },
            { token: "ticket-todo", swatch: "bg-ticket-todo" },
            { token: "ticket-unassigned", swatch: "bg-ticket-unassigned" },
            { token: "ticket-paused", swatch: "bg-ticket-paused" },
            { token: "ticket-cancelled", swatch: "bg-ticket-cancelled" },
        ],
    },
    {
        label: "app colours",
        tokens: ALL_CUSTOM_APP_COLORS.map((color) => ({
            token: `app-${color}`,
            swatch: `bg-app-${color}`,
        })),
    },
];

const TYPE_SCALE = [
    {
        spec: "38 / 300 / -3.5%",
        usage: "display",
        className: "text-[38px] font-light tracking-[-0.035em] lowercase",
    },
    {
        spec: "27 / 400 / -2.5%",
        usage: "PageHeader",
        className: "text-[27px] tracking-[-0.025em] lowercase",
    },
    {
        spec: "26 / 300 / -3%",
        usage: "StatCard figures",
        className: "text-[26px] font-light tracking-[-0.03em] tabular-nums",
    },
    {
        spec: "14 / 400",
        usage: "body, CardTitle",
        className: "text-[14px] lowercase",
    },
    {
        spec: "13 / 400",
        usage: "PanelHeader, rows",
        className: "text-[13px] lowercase",
    },
    {
        spec: "12.5 / 400",
        usage: "nav, buttons",
        className: "text-[12.5px] lowercase",
    },
    {
        spec: "10 / +11% mono",
        usage: "MonoLabel, InputLabel",
        className: "font-mono text-[10px] tracking-[0.11em] uppercase",
    },
    {
        spec: "10 / mono",
        usage: "tags, refs, meta",
        className: "font-mono text-[10px] lowercase",
    },
];

const SPACING_SCALE = [4, 6, 8, 10, 14, 20, 26, 34];

const RADII = [
    { label: "4px · badges", className: "rounded-[4px]" },
    { label: "5px · tags", className: "rounded-[5px]" },
    { label: "6px · nav, chips", className: "rounded-md" },
    { label: "7px · buttons, inputs", className: "rounded-[7px]" },
    { label: "9px · popouts, cards", className: "rounded-[9px]" },
    { label: "10px · panels", className: "rounded-[10px]" },
    { label: "full · pills, avatars", className: "rounded-full" },
];

const DROPDOWN_OPTIONS = [
    { label: "All options", value: "" },
    { label: "Example option one", value: "one" },
    {
        label: "Example option two",
        value: "two",
        description: "options can carry a description",
    },
    { label: "Example option three", value: "three" },
];

const MULTI_SELECT_OPTIONS = DROPDOWN_OPTIONS.slice(1);

const NAVIGATOR_OPTIONS = [
    { label: "Board" },
    { label: "List" },
    { label: "Timeline" },
];

const SIDE_NAV_OPTIONS = [
    { label: "All entries", count: 142 },
    { label: "Routing rules", count: 38 },
    { label: "Teams", count: 24 },
    { label: "Policies", count: 12 },
];

const RADIO_OPTIONS = [
    { label: "Example option one", value: "one" },
    {
        label: "Example option two",
        value: "two",
        description: "options can carry a description",
    },
    { label: "Example option three", value: "three" },
];

const SEARCH_GROUPS = [
    {
        label: "Go to",
        options: [
            { label: "Dashboard", value: "dashboard", meta: "workspace" },
            { label: "Tickets", value: "tickets", meta: "workspace" },
            { label: "Insights", value: "insights", meta: "intelligence" },
        ],
    },
];

const EXAMPLE_PROFILE: UserProfile = {
    id: "example",
    first_name: "Callum",
    last_name: "Burgoyne",
    avatar_url: "",
    country: "United Kingdom",
    created_at: new Date().toISOString(),
};

const EXAMPLE_TEAM: UserProfile[] = [
    { ...EXAMPLE_PROFILE, id: "1", first_name: "Kacper", last_name: "Nowak" },
    { ...EXAMPLE_PROFILE, id: "2", first_name: "Priya", last_name: "Shah" },
    { ...EXAMPLE_PROFILE, id: "3", first_name: "Tom", last_name: "Reid" },
    { ...EXAMPLE_PROFILE, id: "4", first_name: "Rosa", last_name: "Mendes" },
    { ...EXAMPLE_PROFILE, id: "5", first_name: "Mia", last_name: "Ahmed" },
];

const ComponentsTab = () => {
    const [selectedChip, setSelectedChip] = useState<string>("one");
    const [popoutVisible, setPopoutVisible] = useState<boolean>(false);
    const [searchOpen, setSearchOpen] = useState<boolean>(false);

    const { pushPopup, popPopup } = usePopup();

    return (
        <div className="max-w-3xl space-y-10">
            <Section label="Button">
                <div className="flex flex-wrap items-center gap-2.5">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="accent">Accent</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="secondary-transparent">Transparent</Button>
                    <Button variant="danger-transparent">
                        <TrashIcon size={BUTTON_ICON_SIZE} />
                        Delete
                    </Button>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                    <Button variant="primary" disabled>
                        Disabled
                    </Button>
                    <Button variant="secondary" disabled>
                        Disabled
                    </Button>
                    <Button variant="danger" disabled>
                        Disabled
                    </Button>
                    <Button variant="primary" disabled>
                        <LoadingSpinner variant="btn-disabled" />
                        Loading
                    </Button>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                    <Button variant="primary" size="sm">
                        <PlusIcon size={15} />
                        Small
                    </Button>
                    <Button variant="secondary" size="sm">
                        Small
                    </Button>
                    <LinkButton to="/test" variant="secondary">
                        Link button
                    </LinkButton>
                </div>
            </Section>

            <Section label="Input & Textarea">
                <div className="flex gap-3">
                    <Input
                        containerClassName="flex-1"
                        className="w-full"
                        label="Example label"
                        placeholder="Example placeholder"
                    />
                    <Input
                        containerClassName="flex-1"
                        className="w-full"
                        label="Disabled"
                        defaultValue="Example value"
                        disabled
                    />
                </div>
                <div className="flex gap-3">
                    <Textarea
                        containerClassName="flex-1"
                        label="Example label"
                        placeholder="Example placeholder"
                    />
                    <Textarea
                        containerClassName="flex-1"
                        label="Disabled"
                        defaultValue="Example value"
                        disabled
                    />
                </div>
            </Section>

            <Section label="SearchBar">
                <SearchBar
                    containerClassName="max-w-sm"
                    className="w-full"
                    label="Example label"
                    placeholder="Search here..."
                />
            </Section>

            <Section label="Dropdown & MultiSelect">
                <div className="flex items-start gap-3">
                    <Dropdown
                        containerClassName="flex-1"
                        options={DROPDOWN_OPTIONS}
                        label="Example label"
                        defaultValue=""
                    />
                    <MultiSelect
                        containerClassName="flex-1"
                        options={MULTI_SELECT_OPTIONS}
                        label="Example label"
                        defaultValues={["one"]}
                    />
                </div>
                {/* Same component, with an inline label instead of one above */}
                <div className="flex flex-wrap gap-2">
                    <Dropdown
                        size="sm"
                        inlineLabel="team"
                        options={DROPDOWN_OPTIONS}
                        defaultValue=""
                    />
                    <Dropdown
                        size="sm"
                        inlineLabel="priority"
                        options={DROPDOWN_OPTIONS}
                        defaultValue=""
                    />
                </div>
                <div className="flex items-start gap-3">
                    <Dropdown
                        containerClassName="flex-1"
                        options={DROPDOWN_OPTIONS}
                        label="Disabled"
                        disabled
                    />
                    <MultiSelect
                        containerClassName="flex-1"
                        options={MULTI_SELECT_OPTIONS}
                        label="Disabled"
                        disabled
                    />
                </div>
            </Section>

            <Section label="DatePicker & TimePicker">
                <div className="flex items-start gap-3">
                    <DatePicker containerClassName="flex-1" label="Due date" />
                    <TimePicker
                        containerClassName="w-40"
                        label="Due time"
                        defaultValue="09:00"
                    />
                </div>
            </Section>

            <Section label="CodeInput & FileUpload">
                <CodeInput label="Verification code" />
                <FileUpload label="Attachments" />
            </Section>

            <Section label="Checkbox, Toggle & RadioGroup">
                <div className="flex flex-wrap gap-x-10 gap-y-3">
                    <div className="flex flex-col items-start gap-3">
                        <Checkbox label="Example option" defaultChecked />
                        <Checkbox label="Example option" />
                        <Checkbox label="Disabled" disabled />
                        <Checkbox label="Disabled" defaultChecked disabled />
                    </div>
                    <div className="flex flex-col items-start gap-3">
                        <Toggle label="Example option" defaultChecked />
                        <Toggle label="Example option" />
                        <Toggle label="Disabled" disabled />
                        <Toggle label="Disabled" defaultChecked disabled />
                    </div>
                </div>
                <RadioGroup
                    label="Inline"
                    options={RADIO_OPTIONS}
                    defaultValue="two"
                />
                <RadioGroup
                    label="Boxed"
                    options={RADIO_OPTIONS}
                    defaultValue="two"
                    boxed
                />
            </Section>

            <Section label="Navigator, SideNav, Chip & Breadcrumb">
                <Navigator
                    options={NAVIGATOR_OPTIONS}
                    defaultOptionLabel="Board"
                />
                <SideNav
                    className="max-w-56"
                    options={SIDE_NAV_OPTIONS}
                    defaultOptionLabel="All entries"
                />
                <Breadcrumb root="Workspace" leaf="Dashboard" />
                <div className="flex flex-wrap gap-2">
                    {["one", "two", "three"].map((chip) => (
                        <Chip
                            key={chip}
                            selected={chip === selectedChip}
                            onClick={() => setSelectedChip(chip)}
                        >
                            option {chip}
                        </Chip>
                    ))}
                    <Chip disabled>disabled</Chip>
                </div>
            </Section>

            <Section label="Tags & status">
                <div className="flex flex-wrap items-center gap-2">
                    <PriorityTag priority="low" />
                    <PriorityTag priority="medium" />
                    <PriorityTag priority="high" />
                    <PriorityFlag priority="high" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <StatusTag status="unassigned" />
                    <StatusTag status="todo" />
                    <StatusTag status="in-progress" />
                    <StatusTag status="paused" />
                    <StatusTag status="resolved" />
                    <StatusTag status="cancelled" />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <StatusDot status="unassigned" />
                    <StatusDot status="todo" />
                    <StatusDot status="in-progress" />
                    <StatusDot status="paused" />
                    <StatusDot status="resolved" />
                    <StatusDot status="cancelled" />
                </div>
                <div className="flex flex-wrap gap-2">
                    {ALL_CUSTOM_APP_COLORS.map((color) => (
                        <Tag key={color} color={color as CustomAppColor}>
                            {color}
                        </Tag>
                    ))}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <CountBadge>4</CountBadge>
                    <CountBadge variant="warning">12</CountBadge>
                    <CountBadge variant="neutral">86</CountBadge>
                    <FactChip label="since" value="Fri 15 Aug" />
                </div>
            </Section>

            <Section label="Card">
                <div className="grid grid-cols-2 gap-4">
                    <Card
                        className="w-full"
                        title="Default card"
                        description="This is an example of a card"
                    />
                    <Card
                        className="w-full"
                        title="Muted card"
                        description="This is an example of a card"
                        variant="muted"
                    />
                    <Card
                        className="w-full"
                        title="Highlight card"
                        description="Marks anything the agent produced"
                        variant="highlight"
                    />
                    <Card
                        className="w-full"
                        title="Clickable card"
                        description="This is an example of a card"
                        onClick={() => {}}
                    />
                </div>
            </Section>

            <Section label="StatCard & ProgressBar">
                <div className="grid grid-cols-3 gap-4">
                    <StatCard
                        label="Open tickets"
                        value="24"
                        caption="+12% on last week"
                        captionVariant="success"
                    />
                    <StatCard
                        label="Avg resolution"
                        value="4.2h"
                        caption="−8% on last week"
                        captionVariant="danger"
                    />
                    <StatCard
                        label="Unassigned"
                        value="03"
                        caption="Across 2 teams"
                    />
                </div>
                <ProgressBar
                    className="max-w-sm"
                    targetValue={100}
                    currentValue={62}
                    currentLabel="62 resolved"
                    targetLabel="100"
                />
            </Section>

            <Section label="Panel">
                <Panel
                    title="Needs your decision"
                    count={3}
                    action={
                        <ClickableText onClick={() => {}}>
                            view all →
                        </ClickableText>
                    }
                >
                    {["ACM-341", "ACM-359", "ACM-362"].map((code) => (
                        <PanelRow key={code} onClick={() => {}}>
                            <PriorityFlag priority="high" />
                            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                <p className="text-text-primary truncate text-[13.5px]">
                                    Example ticket title
                                </p>
                                <p className="text-text-faint font-mono text-[10px]">
                                    {code} · Platform
                                </p>
                            </span>
                            <StatusTag status="in-progress" />
                        </PanelRow>
                    ))}
                </Panel>
            </Section>

            <Section label="Timeline">
                <Timeline>
                    {["opened this ticket", "left an update"].map(
                        (verb, index, all) => (
                            <TimelineItem
                                key={verb}
                                avatar={
                                    <UserAvatar
                                        profile={EXAMPLE_PROFILE}
                                        size="sm"
                                    />
                                }
                                actor="Callum Burgoyne"
                                verb={verb}
                                time="4m ago"
                                last={index === all.length - 1}
                            >
                                <p className="text-text-secondary text-[13.5px] leading-relaxed">
                                    Entries with a body draw it in a bubble,
                                    entries without one are a single line.
                                </p>
                            </TimelineItem>
                        )
                    )}
                </Timeline>
            </Section>

            <Section label="Avatars">
                <div className="flex items-center gap-4">
                    <UserAvatar profile={EXAMPLE_PROFILE} />
                    <UserAvatar profile={EXAMPLE_PROFILE} size="sm" />
                    <UserAvatar profile={EXAMPLE_PROFILE} size="xs" />
                    <UserAvatar profile={undefined} />
                    <AvatarStack profiles={EXAMPLE_TEAM} />
                </div>
            </Section>

            <Section label="LoadingSpinner & EmptyStateCard">
                <div className="flex items-center gap-4">
                    <LoadingSpinner variant="bg" />
                    <LoadingSpinner variant="surface" />
                    <LoadingSpinner variant="btn-disabled" />
                </div>
                <EmptyStateCard
                    icon={<InboxIcon size={24} />}
                    title="Nothing here yet"
                    description="Example description explaining what would normally appear in this list."
                    button={{
                        label: "Example action",
                        icon: <PlusIcon size={BUTTON_ICON_SIZE} />,
                        onClick: () => {},
                    }}
                />
            </Section>

            <Section label="Brand">
                <AppLogo />
            </Section>

            <Section label="Typography">
                <PageHeader>page title</PageHeader>
                <InputLabel text="Example input label" />
                <MonoLabel>example mono label</MonoLabel>
                <ClickableText onClick={() => {}}>
                    Example clickable text
                </ClickableText>
                <Divider />
            </Section>

            <Section label="Popout, Popup & SearchPopup">
                <div className="flex flex-wrap items-center gap-3">
                    <ClickableGroup
                        className="relative"
                        onClick={() => setPopoutVisible((prev) => !prev)}
                    >
                        <EllipsisVerticalIcon size={19} />
                        {popoutVisible && (
                            <Popout xPos="right" yPos="bottom" title="actions">
                                <Button
                                    variant="secondary-transparent"
                                    className="h-9 w-full justify-start rounded-none px-3"
                                >
                                    <PlusIcon size={15} />
                                    Add
                                </Button>
                                <Button
                                    variant="danger-transparent"
                                    className="h-9 w-full justify-start rounded-none px-3"
                                >
                                    <TrashIcon size={15} />
                                    Remove
                                </Button>
                            </Popout>
                        )}
                    </ClickableGroup>
                    <Button
                        variant="secondary"
                        onClick={() =>
                            pushPopup(
                                <Popup
                                    title="Example popup"
                                    description="This is an example of a popup"
                                    closePopup={popPopup}
                                    className="w-100"
                                >
                                    <Divider />
                                    <span className="flex justify-end gap-2">
                                        <Button
                                            variant="secondary-transparent"
                                            onClick={popPopup}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="primary"
                                            onClick={popPopup}
                                        >
                                            Confirm
                                        </Button>
                                    </span>
                                </Popup>
                            )
                        }
                    >
                        Open popup
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setSearchOpen(true)}
                    >
                        Open search
                    </Button>
                    {searchOpen && (
                        <SearchPopup
                            groups={SEARCH_GROUPS}
                            closePopup={() => setSearchOpen(false)}
                        />
                    )}
                </div>
            </Section>
        </div>
    );
};

// Scratch controls for driving the api and auth by hand during development
const TestingTab = () => {
    const [orgs, setOrgs] = useState<Organisation[]>([]);
    const [members, setMembers] = useState<OrganisationMember[]>([]);

    const { theme, toggleTheme } = useTheme();
    const {
        sessionLoading,
        user,
        userProfile,
        userProfileLoading,
        refetchUserProfile,
        signOut,
    } = useUser();

    const createOrg = async () => {
        await createOrganisation({
            name: "10X Managers",
            logo_url: "example.com",
        });
    };

    const fetchOrgs = async () => {
        const resp = await fetchOrganisations();
        if (resp) {
            setOrgs(resp);
        }
    };

    const fetchMembers = async () => {
        const resp = await fetchOrganisationMembers(orgs[0].id);
        if (resp) {
            setMembers(resp);
            console.log(resp);
        }
    };

    const updateFirstName = async (first_name: string) => {
        const resp = await updateUserProfile({ first_name });
        if (resp) {
            refetchUserProfile();
        }
    };

    return (
        <div className="max-w-3xl space-y-10">
            <Section label="Account">
                <div className="flex flex-wrap gap-2.5">
                    <Button
                        variant="primary"
                        onClick={() =>
                            signUp("callumburgoyne04@gmail.com", "abc123abc")
                        }
                    >
                        Sign up
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() =>
                            signIn("callumburgoyne04@gmail.com", "abc123abc")
                        }
                    >
                        Sign in
                    </Button>
                    <Button variant="secondary" onClick={() => signOut()}>
                        Sign out
                    </Button>
                </div>
            </Section>

            <Section label="Organisations">
                <div className="flex flex-wrap gap-2.5">
                    <Button variant="primary" onClick={createOrg}>
                        <PlusIcon size={BUTTON_ICON_SIZE} />
                        Create test org
                    </Button>
                    <Button variant="secondary" onClick={fetchOrgs}>
                        Fetch orgs
                    </Button>
                    <Button
                        variant="secondary"
                        disabled={orgs.length === 0}
                        onClick={fetchMembers}
                    >
                        Fetch members
                    </Button>
                </div>
                <p className="text-text-secondary text-[13px]">
                    {orgs.length === 0
                        ? "No orgs fetched"
                        : orgs.map((o) => o.name).join(", ")}
                </p>
                <p className="text-text-secondary text-[13px]">
                    {members.length === 0
                        ? "No members fetched"
                        : members
                              .map(
                                  (m) =>
                                      `${m.user.first_name ?? "unknown name"}: ${m.role}`
                              )
                              .join(", ")}
                </p>
            </Section>

            <Section label="Profile">
                <div className="flex flex-wrap gap-2.5">
                    <Button
                        variant="primary"
                        onClick={() => updateFirstName("Callum")}
                    >
                        Set first name to Callum
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => updateFirstName("Ballum")}
                    >
                        Set first name to Ballum
                    </Button>
                </div>
                <div className="text-text-secondary space-y-1 text-[13px]">
                    <p>{sessionLoading ? "loading email..." : user?.email}</p>
                    {userProfileLoading ? (
                        <p>Loading user profile</p>
                    ) : (
                        <>
                            <p>First name: {userProfile?.first_name ?? "-"}</p>
                            <p>Last name: {userProfile?.last_name ?? "-"}</p>
                            <p>Country: {userProfile?.country ?? "-"}</p>
                        </>
                    )}
                </div>
            </Section>

            <Section label="Notifications & theme">
                <div className="flex flex-wrap gap-2.5">
                    <Button
                        variant="secondary"
                        onClick={() =>
                            markNotificationAsRead(
                                "926bb60b-259e-4284-bf0b-9cb7770342e3"
                            )
                        }
                    >
                        Mark notification as read
                    </Button>
                    <Button variant="secondary" onClick={toggleTheme}>
                        Enable {theme === "light" ? "dark" : "light"} theme
                    </Button>
                </div>
            </Section>
        </div>
    );
};

// Read the live token values so this page can never drift from App.css
const readTokenValue = (token: string) =>
    getComputedStyle(document.documentElement)
        .getPropertyValue(`--color-${token}`)
        .trim();

const ColourTab = () => {
    return (
        <div className="max-w-4xl space-y-10">
            {COLOUR_GROUPS.map((group) => (
                <Section key={group.label} label={group.label}>
                    <div className="grid grid-cols-3 gap-3">
                        {group.tokens.map(({ token, swatch }) => (
                            <div
                                key={token}
                                className="border-surface-border bg-surface flex items-center gap-3 rounded-[10px] border p-3"
                            >
                                <div
                                    className={twMerge(
                                        "border-surface-border size-9 shrink-0 rounded-md border",
                                        swatch
                                    )}
                                />
                                <div className="flex min-w-0 flex-col">
                                    <span className="text-text-primary truncate text-[12.5px]">
                                        {token}
                                    </span>
                                    <span className="text-text-tertiary truncate font-mono text-[10px]">
                                        {readTokenValue(token) || "—"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>
            ))}
        </div>
    );
};

const TypeTab = () => {
    return (
        <div className="max-w-3xl space-y-10">
            <Section label="Scale">
                <div>
                    {TYPE_SCALE.map((row) => (
                        <div
                            key={row.spec}
                            className="border-b-layout-border flex items-baseline gap-6 border-b py-4"
                        >
                            <span className="text-text-disabled w-36 shrink-0 font-mono text-[10px]">
                                {row.spec}
                            </span>
                            <span
                                className={twMerge(
                                    "text-text-primary flex-1",
                                    row.className
                                )}
                            >
                                Sample text 1234
                            </span>
                            <span className="text-text-tertiary hidden w-40 shrink-0 text-right font-mono text-[10px] sm:block">
                                {row.usage}
                            </span>
                        </div>
                    ))}
                </div>
            </Section>

            <Section label="Families">
                <div className="space-y-3">
                    <p className="text-text-primary font-sans text-[19px]">
                        IBM Plex Sans — headings, body and buttons
                    </p>
                    <p className="text-text-primary font-mono text-[15px] tracking-wide">
                        IBM Plex Mono — labels, codes and metadata
                    </p>
                    <p className="text-text-primary font-[Plus_Jakarta_Sans] text-[17px]">
                        Plus Jakarta Sans — the booth wordmark only
                    </p>
                </div>
                <p className="text-text-tertiary text-[13px] leading-relaxed">
                    Headings, descriptions and card copy are lowercase. Mono is
                    reserved for labels, ticket codes and numerals — uppercase
                    only on tags.
                </p>
            </Section>
        </div>
    );
};

const FoundationsTab = () => {
    return (
        <div className="max-w-3xl space-y-10">
            <Section label="Spacing">
                <div className="space-y-2">
                    {SPACING_SCALE.map((step) => (
                        <div key={step} className="flex items-center gap-4">
                            <span className="text-text-disabled w-10 font-mono text-[10px] tabular-nums">
                                {step}
                            </span>
                            <div
                                className="bg-highlight h-3"
                                style={{ width: step }}
                            />
                        </div>
                    ))}
                </div>
            </Section>

            <Section label="Radius">
                <div className="flex flex-wrap gap-5">
                    {RADII.map((radius) => (
                        <div
                            key={radius.label}
                            className="flex flex-col items-center gap-2"
                        >
                            <div
                                className={twMerge(
                                    "border-surface-border bg-surface size-14 border",
                                    radius.className
                                )}
                            />
                            <span className="text-text-tertiary font-mono text-[10px]">
                                {radius.label}
                            </span>
                        </div>
                    ))}
                </div>
            </Section>

            <Section label="Sizes">
                <div className="space-y-3 text-[13px]">
                    <div className="flex items-center gap-4">
                        <span className="text-text-tertiary w-40 shrink-0">
                            34px control height
                        </span>
                        <div className="border-input-border h-8.5 w-40 rounded-[7px] border border-dashed" />
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-text-tertiary w-40 shrink-0">
                            36px input height
                        </span>
                        <div className="border-input-border h-9 w-40 rounded-[7px] border border-dashed" />
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-text-tertiary w-40 shrink-0">
                            1px hairline
                        </span>
                        <Divider className="flex-1" />
                    </div>
                </div>
                <p className="text-text-tertiary text-[13px] leading-relaxed">
                    Icons come from lucide-react at 13–16px. The topbar is 56px
                    tall and the sidebar 212px wide, both set as css variables
                    in App.css.
                </p>
            </Section>

            <Section label="Elevation">
                <div className="flex flex-wrap gap-4">
                    <div className="border-surface-border bg-surface text-text-tertiary flex size-28 items-center justify-center rounded-[10px] border font-mono text-[10px]">
                        panel
                    </div>
                    <div className="bg-surface-raised border-popup-border text-text-tertiary flex size-28 items-center justify-center rounded-[9px] border font-mono text-[10px] shadow-xl">
                        popout
                    </div>
                    <div className="bg-surface-raised border-popup-border text-text-tertiary flex size-28 items-center justify-center rounded-xl border font-mono text-[10px] shadow-2xl">
                        popup
                    </div>
                </div>
            </Section>
        </div>
    );
};

const TAB_CONTENT: Record<Tab, ReactNode> = {
    components: <ComponentsTab />,
    colour: <ColourTab />,
    type: <TypeTab />,
    foundations: <FoundationsTab />,
    testing: <TestingTab />,
};

const DesignPage = () => {
    usePageTitle("design library / booth");

    const [activeTab, setActiveTab] = useState<Tab>("components");

    return (
        <Page
            title="Design library"
            navigation={
                <Navigator
                    options={TAB_OPTIONS}
                    defaultOptionLabel={activeTab}
                    onChange={(option) => setActiveTab(option.label as Tab)}
                />
            }
        >
            {TAB_CONTENT[activeTab]}
        </Page>
    );
};

export default DesignPage;
