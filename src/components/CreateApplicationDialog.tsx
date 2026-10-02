import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  Badge,
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  Field,
  Input,
  OverlayDrawer,
  Textarea,
  mergeClasses,
  useRestoreFocusSource,
} from '@fluentui/react-components'
import { Dismiss24Regular } from '@fluentui/react-icons'
import { useCreateApplicationDialogStyles } from '../styles/CreateApplicationDialog.styles'
import type { Resource } from '../types'

interface CreateApplicationDialogProps {
  open: boolean
  selectedResources: Resource[]
  onClose: () => void
  onCreate: (name: string, description: string) => void
}


export const CreateApplicationDialog = ({
  open,
  selectedResources,
  onClose,
  onCreate,
}: CreateApplicationDialogProps) => {
  const styles = useCreateApplicationDialogStyles()
  const restoreFocusSourceAttributes = useRestoreFocusSource()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [visibleResources] = useState(selectedResources)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const providerStyles: Record<Resource['provider'], string> = {
    AWS: styles.aws,
    GCP: styles.gcp,
    Azure: styles.azure,
  }

  useEffect(() => {
    if (!open) return

    const animationFrame = requestAnimationFrame(() => nameInputRef.current?.focus())
    return () => cancelAnimationFrame(animationFrame)
  }, [open])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) return
    onCreate(trimmedName, description.trim())
  }

  return (
    <OverlayDrawer
      {...restoreFocusSourceAttributes}
      className={styles.drawer}
      backdrop={{ className: styles.backdrop }}
      position="end"
      open={open}
      onOpenChange={(_, data) => {
        if (!data.open) onClose()
      }}
    >
      <DrawerHeader className={styles.header}>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              icon={<Dismiss24Regular />}
              aria-label="Close create application drawer"
              onClick={onClose}
            />
          }
        >
          <div>
            <span className={styles.eyebrow}>New application</span>
            <span className={styles.title}>Group selected resources</span>
          </div>
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className={styles.body}>
        <form id="create-application-form" className={styles.form} onSubmit={handleSubmit}>
          <Field label="Application name" required>
            <Input
              ref={nameInputRef}
              value={name}
              onChange={(_, data) => setName(data.value)}
              placeholder="e.g. Payments API"
              maxLength={60}
              required
            />
          </Field>
          <Field
            label={
              <>
                Description <span className={styles.optional}>Optional</span>
              </>
            }
          >
            <Textarea
              textarea={{ className: styles.textarea }}
              value={description}
              onChange={(_, data) => setDescription(data.value)}
              placeholder="What does this application support?"
              rows={3}
              maxLength={240}
              resize="vertical"
            />
          </Field>

          <div className={styles.preview}>
            <div className={styles.previewHeading}>
              <span>Resources</span>
              <Badge appearance="tint" color="brand">
                {visibleResources.length} selected
              </Badge>
            </div>
            <div className={styles.previewList}>
              {visibleResources.map((resource) => (
                <div className={styles.previewResource} key={resource.id}>
                  <span
                    className={mergeClasses(
                      styles.provider,
                      providerStyles[resource.provider],
                    )}
                    aria-hidden="true"
                  >
                    {resource.provider.slice(0, 1)}
                  </span>
                  <div>
                    <strong>{resource.name}</strong>
                    <span>
                      {resource.type} · {resource.environment}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </DrawerBody>

      <DrawerFooter className={styles.footer}>
        <Button appearance="primary" type="submit" form="create-application-form" disabled={!name.trim()}>
          Create application
        </Button>
        <Button appearance="secondary" onClick={onClose}>
          Cancel
        </Button>
      </DrawerFooter>
    </OverlayDrawer>
  )
}
