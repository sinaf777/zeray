'use client'

import { useState } from 'react'
import {
  AlertCircle,
  BadgeCheck,
  CheckCircle2,
  Circle,
  Clock,
  Info,
  Loader2,
  LogOut,
  ShieldCheck,
} from 'lucide-react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

const DEMO_MEMBER_ID = '219666'

type StepStatus = 'done' | 'current' | 'upcoming'

interface OnboardingStep {
  title: string
  description: string
  status: StepStatus
  weight: number
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    title: 'Application submitted',
    description: 'Membership application received and accepted.',
    status: 'done',
    weight: 25,
  },
  {
    title: 'Identity & document review',
    description: 'Submitted documents were reviewed and verified.',
    status: 'done',
    weight: 25,
  },
  {
    title: 'Membership registration',
    description: 'Registration completed successfully.',
    status: 'current',
    weight: 26,
  },
  {
    title: 'Orientation & activation',
    description:
      'Attend the welcome orientation to activate full membership benefits.',
    status: 'upcoming',
    weight: 24,
  },
]

const MEMBER = {
  id: DEMO_MEMBER_ID,
  name: 'Zeray Gebremical',
  initials: 'AG',
  avatar: '/profile.jpg',
  age: 45,
  region: 'Tigray',
  country: 'Ethiopia',
  occupation: 'Lawyer',
  registeredOn: '23 October 2026',
}

const COMPLETED_STEPS = ONBOARDING_STEPS.filter((s) => s.status === 'done')
const OVERALL_PROGRESS = COMPLETED_STEPS.reduce((sum, s) => sum + s.weight, 0)

function OrgMark({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const box = size === 'lg' ? 'h-14 w-14 rounded-2xl' : 'h-10 w-10 rounded-xl'
  const icon = size === 'lg' ? 'h-7 w-7' : 'h-5 w-5'
  return (
    <div
      className={`${box} flex items-center justify-center bg-emerald-600 text-white shadow-sm`}
      aria-hidden="true"
    >
      <ShieldCheck className={icon} />
    </div>
  )
}

function LoginView({ onSuccess }: { onSuccess: () => void }) {
  const [memberId, setMemberId] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (memberId.trim() === DEMO_MEMBER_ID) {
      setError(false)
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-10">
      <Card className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
        <CardHeader className="items-center text-center">
          <div className="mb-2 flex justify-center">
            <OrgMark size="lg" />
          </div>
          <CardTitle className="text-xl font-semibold">
            Illuminati Et Org
          </CardTitle>
          <CardDescription>Member Portal — Profile Status Check</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} aria-label="Member login form">
            <div className="space-y-2">
              <Label htmlFor="member-id">Member ID</Label>
              <Input
                id="member-id"
                name="memberId"
                inputMode="numeric"
                autoComplete="off"
                placeholder="Enter your member ID"
                value={memberId}
                onChange={(e) => {
                  setMemberId(e.target.value)
                  setError(false)
                }}
                className="h-11"
                aria-invalid={error}
              />
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Member ID not found. Please check the ID and try again.
                </AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="mt-5 h-11 w-full bg-emerald-600 text-white hover:bg-emerald-700">
              Check My Status
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-xs text-stone-500">
            <span className="font-medium text-stone-700">   </span>
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}

function BioField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-stone-500">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-medium text-stone-800">{value}</p>
    </div>
  )
}

function StepRow({ step, index }: { step: OnboardingStep; index: number }) {
  return (
    <li className="flex items-start gap-3 py-2.5">
      <span className="mt-0.5 shrink-0" aria-hidden="true">
        {step.status === 'done' && (
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        )}
        {step.status === 'current' && (
          <Loader2 className="h-5 w-5 animate-spin text-amber-500" />
        )}
        {step.status === 'upcoming' && (
          <Circle className="h-5 w-5 text-stone-300" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-stone-800">
            {index + 1}. {step.title}
          </p>
          {step.status === 'done' && (
            <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
              Completed
            </Badge>
          )}
          {step.status === 'current' && (
            <Badge className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50">
              In progress
            </Badge>
          )}
          {step.status === 'upcoming' && (
            <Badge variant="outline" className="text-stone-400">
              Pending
            </Badge>
          )}
        </div>
        <p className="mt-0.5 text-sm text-stone-500">{step.description}</p>
      </div>
    </li>
  )
}

function DashboardView({ onSignOut }: { onSignOut: () => void }) {
  const doneCount = COMPLETED_STEPS.length
  return (
    <>
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <OrgMark />
            <div>
              <p className="text-sm font-semibold text-stone-800">
                Illuminati ET Org
              </p>
              <p className="text-xs text-stone-500">Member Portal</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSignOut}
            className="h-10 gap-2 text-stone-600 hover:text-stone-900"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 space-y-6 px-4 py-8">
        <section
          className="grid gap-6 md:grid-cols-5"
          aria-label="Member profile and status"
        >
          {/* Profile card */}
          <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Member Profile</CardTitle>
              <CardDescription>Personal information on file</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 shrink-0 border-2 border-emerald-200 shadow-sm">
                  <AvatarImage
                    src={MEMBER.avatar}
                    alt={MEMBER.name}
                    className="object-cover object-top"
                  />
                  <AvatarFallback className="bg-emerald-50 text-2xl font-bold text-emerald-700">
                    {MEMBER.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold text-stone-800">
                    {MEMBER.name}
                  </p>
                  <p className="text-sm text-stone-500">
                    member — {MEMBER.occupation}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                      <BadgeCheck className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
                      Registered
                    </Badge>
                    <Badge variant="outline" className="text-stone-600">
                      ID {MEMBER.id}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-2.5">
                <BioField label="Age" value={`${MEMBER.age} years`} />
                <BioField label="Occupation" value={MEMBER.occupation} />
                <BioField label="Region" value={MEMBER.region} />
                <BioField label="Country" value={MEMBER.country} />
                <BioField label="Registered on" value={MEMBER.registeredOn} />
                <BioField label="Member ID" value={MEMBER.id} />
              </div>
            </CardContent>
          </Card>

          {/* Progress card */}
          <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 md:col-span-3">
            <CardHeader>
              <CardTitle className="text-base">Onboarding Progress</CardTitle>
              <CardDescription>
                Step {doneCount} of {ONBOARDING_STEPS.length} completed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="flex items-end justify-between">
                  <p className="text-4xl font-bold text-emerald-600">
                    {OVERALL_PROGRESS}%
                  </p>
                  <p className="text-sm text-stone-500">overall completion</p>
                </div>
                <Progress
                  value={OVERALL_PROGRESS}
                  className="mt-2 h-3 bg-stone-100 [&>div]:bg-emerald-600"
                  aria-label={`Onboarding ${OVERALL_PROGRESS}% complete`}
                />
              </div>

              <Separator />

              <ul className="divide-y divide-stone-100" aria-label="Onboarding steps">
                {ONBOARDING_STEPS.map((step, index) => (
                  <StepRow key={step.title} step={step} index={index} />
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Next steps */}
        <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <CardHeader>
            <CardTitle className="text-base">What Happens Next</CardTitle>
            <CardDescription>
              The remaining step of your onboarding, explained
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                  aria-hidden="true"
                />
                <p className="text-sm text-stone-700">
                  The membership office will contact you with the date and details
                  of the sacrifice payment of 2666 Birr that will be needed from you.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <BadgeCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                  aria-hidden="true"
                />
                <p className="text-sm text-stone-700">
                  After orientation, your membership is fully activated and your
                  member card and payment from our office is issued to you.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                  aria-hidden="true"
                />
                <p className="text-sm text-stone-700">
                  Questions about your membership? Contact excutive of online registration Dr solomon Belay .
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Alert className="border-stone-200 bg-white text-stone-600">
          <Info className="h-4 w-4" aria-hidden="true" />
          <AlertDescription>
            All rights of the Registered person is respected to their obligations.
          </AlertDescription>
        </Alert>
      </main>

      <footer className="border-t border-stone-200 bg-white py-4">
        <p className="px-4 text-center text-xs text-stone-500">
          © 2026 Illuminati Et Org · Member Portal — all data shown is
          a relaible data of the person registered.
        </p>
      </footer>
    </>
  )
}

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false)

  function handleSuccess() {
    setLoggedIn(true)
  }

  function handleSignOut() {
    setLoggedIn(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-stone-900">
      {loggedIn ? (
        <DashboardView onSignOut={handleSignOut} />
      ) : (
        <>
          <LoginView onSuccess={handleSuccess} />
          <footer className="border-t border-stone-200 bg-white py-4">
            <p className="px-4 text-center text-xs text-stone-500">
              © 2026 Illuminati Et Org · Member Portal — all data shown is
              a relaible data of the person registered.
            </p>
          </footer>
        </>
      )}
    </div>
  )
}
